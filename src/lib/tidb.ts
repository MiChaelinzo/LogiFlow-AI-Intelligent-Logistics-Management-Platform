import { connect } from '@tidbcloud/serverless';

// TiDB Serverless connection - only initialize if credentials are available
let conn: any = null;

function getConnection() {
  if (!conn) {
    const host = import.meta.env.VITE_TIDB_HOST;
    const username = import.meta.env.VITE_TIDB_USERNAME;
    const password = import.meta.env.VITE_TIDB_PASSWORD;
    const database = import.meta.env.VITE_TIDB_DATABASE;
    
    if (!host || !username || !password || !database) {
      console.warn('TiDB credentials not configured. Using mock data.');
      return null;
    }
    
    try {
      conn = connect({ host, username, password, database });
    } catch (error) {
      console.error('Failed to connect to TiDB:', error);
      return null;
    }
  }
  return conn;
}

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
    const connection = getConnection();
    if (!connection) {
      console.log('Database initialized (mock mode)');
      return;
    }
    
    // Create logistics_events table with vector column
    await connection.execute(`
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
    await connection.execute(`
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
    await connection.execute(`
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
    const connection = getConnection();
    if (!connection) {
      console.log('Mock: Logistics event inserted');
      return { insertId: Math.floor(Math.random() * 1000) };
    }
    
    const result = await connection.execute(
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
    const connection = getConnection();
    if (!connection) {
      // Return mock data for demo
      return [
        {
          id: 1,
          event_type: 'vehicle_breakdown',
          vehicle_id: 'TRK-001',
          location: 'Highway 95, Mile 127',
          description: 'Engine overheating detected',
          severity: 'high',
          similarity_score: 0.15
        },
        {
          id: 2,
          event_type: 'maintenance_alert',
          vehicle_id: 'TRK-003',
          location: 'Service Bay 2',
          description: 'Brake pads require replacement',
          severity: 'medium',
          similarity_score: 0.23
        }
      ];
    }
    
    const result = await connection.execute(
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
    const connection = getConnection();
    if (!connection) {
      console.log('Mock: Vehicle data upserted');
      return { affectedRows: 1 };
    }
    
    const result = await connection.execute(
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
    const connection = getConnection();
    if (!connection) {
      // Return mock data for demo
      return [
        {
          vehicle_id: 'TRK-002',
          vehicle_type: 'truck',
          current_location: 'Downtown District',
          battery_level: 85,
          status: 'active',
          performance_metrics: { fuel_efficiency: 8.5, engine_temp: 87 },
          similarity_score: 0.12
        },
        {
          vehicle_id: 'TRK-004',
          vehicle_type: 'truck',
          current_location: 'Industrial Zone',
          battery_level: 67,
          status: 'en-route',
          performance_metrics: { fuel_efficiency: 7.8, engine_temp: 92 },
          similarity_score: 0.18
        }
      ];
    }
    
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

    const result = await connection.execute(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error searching similar vehicles:', error);
    throw error;
  }
}

// Insert route optimization
export async function insertRouteOptimization(route: RouteOptimization) {
  try {
    const connection = getConnection();
    if (!connection) {
      console.log('Mock: Route optimization inserted');
      return { insertId: Math.floor(Math.random() * 1000) };
    }
    
    const result = await connection.execute(
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
    const connection = getConnection();
    if (!connection) {
      // Return mock data for demo
      return [
        {
          route_id: 'RT-001',
          origin: 'New York Hub',
          destination: 'Boston Center',
          optimization_score: 94.2,
          estimated_time: 180,
          fuel_cost: 85.50,
          ai_recommendations: 'Optimal route with minimal traffic delays',
          similarity_score: 0.08
        }
      ];
    }
    
    const result = await connection.execute(
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
    const connection = getConnection();
    if (!connection) {
      return [];
    }
    
    const result = await connection.execute(
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

// Advanced analytics functions
export async function getFleetPerformanceMetrics(days: number = 7) {
  try {
    const connection = getConnection();
    if (!connection) {
      return [];
    }
    
    const result = await connection.execute(
      `SELECT 
         vehicle_type,
         COUNT(*) as total_vehicles,
         AVG(battery_level) as avg_battery,
         COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
         AVG(JSON_EXTRACT(performance_metrics, '$.fuel_efficiency')) as avg_efficiency
       FROM vehicles 
       WHERE updated_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY vehicle_type`,
      [days]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching fleet metrics:', error);
    throw error;
  }
}

export async function getCostAnalytics(days: number = 30) {
  try {
    const connection = getConnection();
    if (!connection) {
      return [];
    }
    
    const result = await connection.execute(
      `SELECT 
         DATE(timestamp) as date,
         COUNT(*) as total_events,
         AVG(JSON_EXTRACT(metadata, '$.cost_impact')) as avg_cost_impact,
         SUM(CASE WHEN event_type = 'route_optimization' THEN 1 ELSE 0 END) as optimizations
       FROM logistics_events 
       WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY DATE(timestamp)
       ORDER BY date DESC`,
      [days]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching cost analytics:', error);
    throw error;
  }
}

export async function getVectorSearchStats() {
  try {
    const connection = getConnection();
    if (!connection) {
      return { total_vectors: 0, embedded_count: 0, avg_embedding_size: 0 };
    }
    
    const result = await connection.execute(
      `SELECT 
         COUNT(*) as total_vectors,
         COUNT(CASE WHEN embedding IS NOT NULL THEN 1 END) as embedded_count,
         AVG(CHAR_LENGTH(JSON_UNQUOTE(embedding))) as avg_embedding_size
       FROM (
         SELECT embedding FROM logistics_events WHERE embedding IS NOT NULL
         UNION ALL
         SELECT embedding FROM vehicles WHERE embedding IS NOT NULL
         UNION ALL
         SELECT embedding FROM route_optimizations WHERE embedding IS NOT NULL
       ) as all_embeddings`
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching vector stats:', error);
    throw error;
  }
}

export { getConnection };