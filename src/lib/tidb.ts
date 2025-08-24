import { connect } from '@tidbcloud/serverless';

// TiDB Serverless connection
const conn = connect({
  host: import.meta.env.VITE_TIDB_HOST,
  username: import.meta.env.VITE_TIDB_USERNAME,
  password: import.meta.env.VITE_TIDB_PASSWORD,
  database: import.meta.env.VITE_TIDB_DATABASE,
});

export interface LogisticsEvent {
  id?: number;
  event_type: string;
  vehicle_id: string;
  location: string;
  timestamp: Date;
  metadata: any;
  embedding?: number[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface VehicleData {
  id?: number;
  vehicle_id: string;
  vehicle_type: 'truck' | 'drone';
  current_location: string;
  battery_level: number;
  status: string;
  last_maintenance: Date;
  embedding?: number[];
  performance_metrics: any;
}

export interface RouteOptimization {
  id?: number;
  route_id: string;
  origin: string;
  destination: string;
  waypoints: any[];
  optimization_score: number;
  estimated_time: number;
  fuel_cost: number;
  embedding?: number[];
  ai_recommendations: string;
}

// Initialize database tables with vector support
export async function initializeDatabase() {
  try {
    // Create logistics_events table with vector column
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS logistics_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        vehicle_id VARCHAR(50) NOT NULL,
        location TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        metadata JSON,
        embedding VECTOR(1536) COMMENT "Vector embedding for semantic search",
        severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
        description TEXT,
        INDEX idx_vehicle_id (vehicle_id),
        INDEX idx_timestamp (timestamp),
        INDEX idx_severity (severity)
      )
    `);

    // Create vehicles table with vector support
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id VARCHAR(50) UNIQUE NOT NULL,
        vehicle_type ENUM('truck', 'drone') NOT NULL,
        current_location TEXT,
        battery_level INT DEFAULT 100,
        status VARCHAR(50) DEFAULT 'idle',
        last_maintenance TIMESTAMP,
        embedding VECTOR(1536) COMMENT "Vector embedding for vehicle characteristics",
        performance_metrics JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_vehicle_id (vehicle_id),
        INDEX idx_status (status),
        INDEX idx_vehicle_type (vehicle_type)
      )
    `);

    // Create route_optimizations table with vector support
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS route_optimizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        route_id VARCHAR(100) UNIQUE NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        waypoints JSON,
        optimization_score DECIMAL(5,2),
        estimated_time INT,
        fuel_cost DECIMAL(10,2),
        embedding VECTOR(1536) COMMENT "Vector embedding for route characteristics",
        ai_recommendations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_route_id (route_id),
        INDEX idx_optimization_score (optimization_score)
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Insert logistics event with vector embedding
export async function insertLogisticsEvent(event: LogisticsEvent) {
  try {
    const result = await conn.execute(
      `INSERT INTO logistics_events 
       (event_type, vehicle_id, location, metadata, embedding, severity, description) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event.event_type,
        event.vehicle_id,
        event.location,
        JSON.stringify(event.metadata),
        JSON.stringify(event.embedding || []),
        event.severity,
        event.description
      ]
    );
    return result;
  } catch (error) {
    console.error('Error inserting logistics event:', error);
    throw error;
  }
}

// Vector search for similar logistics events
export async function searchSimilarEvents(queryEmbedding: number[], limit: number = 5) {
  try {
    const result = await conn.execute(
      `SELECT id, event_type, vehicle_id, location, timestamp, metadata, severity, description,
              VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
       FROM logistics_events 
       WHERE embedding IS NOT NULL
       ORDER BY similarity_score ASC 
       LIMIT ?`,
      [JSON.stringify(queryEmbedding), limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching similar events:', error);
    throw error;
  }
}

// Insert or update vehicle data
export async function upsertVehicleData(vehicle: VehicleData) {
  try {
    const result = await conn.execute(
      `INSERT INTO vehicles 
       (vehicle_id, vehicle_type, current_location, battery_level, status, last_maintenance, embedding, performance_metrics)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       current_location = VALUES(current_location),
       battery_level = VALUES(battery_level),
       status = VALUES(status),
       embedding = VALUES(embedding),
       performance_metrics = VALUES(performance_metrics),
       updated_at = CURRENT_TIMESTAMP`,
      [
        vehicle.vehicle_id,
        vehicle.vehicle_type,
        vehicle.current_location,
        vehicle.battery_level,
        vehicle.status,
        vehicle.last_maintenance,
        JSON.stringify(vehicle.embedding || []),
        JSON.stringify(vehicle.performance_metrics)
      ]
    );
    return result;
  } catch (error) {
    console.error('Error upserting vehicle data:', error);
    throw error;
  }
}

// Search vehicles by similarity
export async function searchSimilarVehicles(queryEmbedding: number[], vehicleType?: string, limit: number = 10) {
  try {
    let query = `
      SELECT vehicle_id, vehicle_type, current_location, battery_level, status, 
             performance_metrics, VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
      FROM vehicles 
      WHERE embedding IS NOT NULL
    `;
    
    const params: any[] = [JSON.stringify(queryEmbedding)];
    
    if (vehicleType) {
      query += ` AND vehicle_type = ?`;
      params.push(vehicleType);
    }
    
    query += ` ORDER BY similarity_score ASC LIMIT ?`;
    params.push(limit);

    const result = await conn.execute(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error searching similar vehicles:', error);
    throw error;
  }
}

// Insert route optimization
export async function insertRouteOptimization(route: RouteOptimization) {
  try {
    const result = await conn.execute(
      `INSERT INTO route_optimizations 
       (route_id, origin, destination, waypoints, optimization_score, estimated_time, fuel_cost, embedding, ai_recommendations)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       waypoints = VALUES(waypoints),
       optimization_score = VALUES(optimization_score),
       estimated_time = VALUES(estimated_time),
       fuel_cost = VALUES(fuel_cost),
       embedding = VALUES(embedding),
       ai_recommendations = VALUES(ai_recommendations)`,
      [
        route.route_id,
        route.origin,
        route.destination,
        JSON.stringify(route.waypoints),
        route.optimization_score,
        route.estimated_time,
        route.fuel_cost,
        JSON.stringify(route.embedding || []),
        route.ai_recommendations
      ]
    );
    return result;
  } catch (error) {
    console.error('Error inserting route optimization:', error);
    throw error;
  }
}

// Search similar routes
export async function searchSimilarRoutes(queryEmbedding: number[], limit: number = 5) {
  try {
    const result = await conn.execute(
      `SELECT route_id, origin, destination, waypoints, optimization_score, 
              estimated_time, fuel_cost, ai_recommendations,
              VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
       FROM route_optimizations 
       WHERE embedding IS NOT NULL
       ORDER BY similarity_score ASC 
       LIMIT ?`,
      [JSON.stringify(queryEmbedding), limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching similar routes:', error);
    throw error;
  }
}

// Get recent events for analysis
export async function getRecentEvents(hours: number = 24, limit: number = 100) {
  try {
    const result = await conn.execute(
      `SELECT * FROM logistics_events 
       WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? HOUR)
       ORDER BY timestamp DESC 
       LIMIT ?`,
      [hours, limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching recent events:', error);
    throw error;
  }
}

export { conn };