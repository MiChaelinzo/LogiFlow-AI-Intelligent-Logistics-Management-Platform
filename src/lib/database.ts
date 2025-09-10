import { connect } from '@tidbcloud/serverless';

// Real TiDB Serverless connection with proper error handling
let conn: any = null;

export interface DatabaseConfig {
  host: string;
  username: string;
  password: string;
  database: string;
}

export function initializeConnection(config?: DatabaseConfig) {
  try {
    const host = config?.host || import.meta.env.VITE_TIDB_HOST;
    const username = config?.username || import.meta.env.VITE_TIDB_USERNAME;
    const password = config?.password || import.meta.env.VITE_TIDB_PASSWORD;
    const database = config?.database || import.meta.env.VITE_TIDB_DATABASE;
    
    if (!host || !username || !password || !database) {
      throw new Error('TiDB credentials not configured');
    }
    
    conn = connect({ 
      host, 
      username, 
      password, 
      database,
      arrayMode: true
    });
    
    console.log('✅ TiDB Serverless connection established');
    return conn;
  } catch (error) {
    console.error('❌ TiDB connection failed:', error);
    throw error;
  }
}

export function getConnection() {
  if (!conn) {
    return initializeConnection();
  }
  return conn;
}

export async function testConnection(): Promise<boolean> {
  try {
    const connection = getConnection();
    await connection.execute('SELECT 1');
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
}

// Real database schema creation
export async function createTables() {
  const connection = getConnection();
  
  try {
    // Create logistics_events table with vector support
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS logistics_events (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        vehicle_id VARCHAR(50) NOT NULL,
        location TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        metadata JSON,
        embedding VECTOR(1536) COMMENT "Vector embedding for semantic search",
        severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
        description TEXT,
        processed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_vehicle_id (vehicle_id),
        INDEX idx_timestamp (timestamp),
        INDEX idx_severity (severity),
        INDEX idx_event_type (event_type)
      )
    `);

    // Create vehicles table with comprehensive tracking
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id VARCHAR(50) UNIQUE NOT NULL,
        vehicle_type ENUM('truck', 'drone', 'van', 'motorcycle') NOT NULL,
        name VARCHAR(200) NOT NULL,
        model VARCHAR(100),
        year INT,
        license_plate VARCHAR(20),
        current_location TEXT,
        battery_level INT DEFAULT 100,
        fuel_level INT DEFAULT 100,
        status ENUM('idle', 'active', 'charging', 'maintenance', 'offline') DEFAULT 'idle',
        last_maintenance TIMESTAMP,
        next_maintenance TIMESTAMP,
        driver_name VARCHAR(100),
        driver_phone VARCHAR(20),
        driver_email VARCHAR(100),
        capacity VARCHAR(50),
        fuel_type ENUM('electric', 'diesel', 'gasoline', 'hybrid') DEFAULT 'electric',
        embedding VECTOR(1536) COMMENT "Vector embedding for vehicle characteristics",
        performance_metrics JSON,
        iot_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_vehicle_id (vehicle_id),
        INDEX idx_status (status),
        INDEX idx_vehicle_type (vehicle_type),
        INDEX idx_driver_name (driver_name)
      )
    `);

    // Create route_optimizations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS route_optimizations (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        route_id VARCHAR(100) UNIQUE NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        waypoints JSON,
        optimization_score DECIMAL(5,2),
        estimated_time INT,
        fuel_cost DECIMAL(10,2),
        distance_km DECIMAL(10,2),
        traffic_factor DECIMAL(3,2) DEFAULT 1.0,
        weather_factor DECIMAL(3,2) DEFAULT 1.0,
        embedding VECTOR(1536) COMMENT "Vector embedding for route characteristics",
        ai_recommendations TEXT,
        status ENUM('planned', 'active', 'completed', 'cancelled') DEFAULT 'planned',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_route_id (route_id),
        INDEX idx_status (status),
        INDEX idx_optimization_score (optimization_score)
      )
    `);

    // Create inventory table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        item_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(200) NOT NULL,
        category VARCHAR(100) NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        reserved_quantity INT DEFAULT 0,
        unit_price DECIMAL(10,2),
        location VARCHAR(200),
        warehouse_id VARCHAR(50),
        supplier VARCHAR(200),
        expiry_date DATE,
        temperature_min DECIMAL(5,2),
        temperature_max DECIMAL(5,2),
        embedding VECTOR(1536) COMMENT "Vector embedding for item characteristics",
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_item_id (item_id),
        INDEX idx_category (category),
        INDEX idx_warehouse_id (warehouse_id),
        INDEX idx_quantity (quantity)
      )
    `);

    // Create ai_decisions table for tracking AI workflow results
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ai_decisions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        workflow_type VARCHAR(100) NOT NULL,
        input_data JSON NOT NULL,
        ai_analysis TEXT,
        recommendations JSON,
        confidence_score DECIMAL(5,2),
        execution_time_ms INT,
        success BOOLEAN DEFAULT TRUE,
        error_message TEXT,
        embedding VECTOR(1536) COMMENT "Vector embedding for decision context",
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_workflow_type (workflow_type),
        INDEX idx_confidence_score (confidence_score),
        INDEX idx_created_at (created_at)
      )
    `);

    console.log('✅ All database tables created successfully');
    return true;
  } catch (error) {
    console.error('❌ Table creation failed:', error);
    throw error;
  }
}

// Real-time data insertion functions
export async function insertVehicle(vehicleData: any) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      INSERT INTO vehicles (
        vehicle_id, vehicle_type, name, model, year, license_plate,
        current_location, battery_level, fuel_level, status,
        driver_name, driver_phone, driver_email, capacity, fuel_type,
        embedding, performance_metrics
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        current_location = VALUES(current_location),
        battery_level = VALUES(battery_level),
        fuel_level = VALUES(fuel_level),
        status = VALUES(status),
        embedding = VALUES(embedding),
        performance_metrics = VALUES(performance_metrics),
        updated_at = CURRENT_TIMESTAMP
    `, [
      vehicleData.vehicle_id,
      vehicleData.vehicle_type,
      vehicleData.name,
      vehicleData.model || null,
      vehicleData.year || null,
      vehicleData.license_plate || null,
      vehicleData.current_location || 'Unknown',
      vehicleData.battery_level || 100,
      vehicleData.fuel_level || 100,
      vehicleData.status || 'idle',
      vehicleData.driver_name || null,
      vehicleData.driver_phone || null,
      vehicleData.driver_email || null,
      vehicleData.capacity || null,
      vehicleData.fuel_type || 'electric',
      JSON.stringify(vehicleData.embedding || []),
      JSON.stringify(vehicleData.performance_metrics || {})
    ]);
    
    return result;
  } catch (error) {
    console.error('Error inserting vehicle:', error);
    throw error;
  }
}

export async function getAllVehicles() {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      SELECT * FROM vehicles 
      ORDER BY created_at DESC
    `);
    
    return result.rows.map((row: any) => ({
      id: row[0],
      vehicle_id: row[1],
      vehicle_type: row[2],
      name: row[3],
      model: row[4],
      year: row[5],
      license_plate: row[6],
      current_location: row[7],
      battery_level: row[8],
      fuel_level: row[9],
      status: row[10],
      last_maintenance: row[11],
      next_maintenance: row[12],
      driver_name: row[13],
      driver_phone: row[14],
      driver_email: row[15],
      capacity: row[16],
      fuel_type: row[17],
      embedding: row[18] ? JSON.parse(row[18]) : null,
      performance_metrics: row[19] ? JSON.parse(row[19]) : {},
      iot_data: row[20] ? JSON.parse(row[20]) : {},
      created_at: row[21],
      updated_at: row[22]
    }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
}

export async function insertLogisticsEvent(eventData: any) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      INSERT INTO logistics_events (
        event_type, vehicle_id, location, metadata, embedding, severity, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      eventData.event_type,
      eventData.vehicle_id,
      eventData.location,
      JSON.stringify(eventData.metadata || {}),
      JSON.stringify(eventData.embedding || []),
      eventData.severity || 'medium',
      eventData.description
    ]);
    
    return result;
  } catch (error) {
    console.error('Error inserting logistics event:', error);
    throw error;
  }
}

export async function getRecentEvents(limit: number = 50) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      SELECT * FROM logistics_events 
      ORDER BY timestamp DESC 
      LIMIT ?
    `, [limit]);
    
    return result.rows.map((row: any) => ({
      id: row[0],
      event_type: row[1],
      vehicle_id: row[2],
      location: row[3],
      timestamp: row[4],
      metadata: row[5] ? JSON.parse(row[5]) : {},
      embedding: row[6] ? JSON.parse(row[6]) : null,
      severity: row[7],
      description: row[8],
      processed: row[9],
      created_at: row[10],
      updated_at: row[11]
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

// Real vector search implementation
export async function vectorSearchSimilarEvents(queryEmbedding: number[], limit: number = 5) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      SELECT id, event_type, vehicle_id, location, timestamp, 
             metadata, severity, description,
             VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
      FROM logistics_events 
      WHERE embedding IS NOT NULL
      ORDER BY similarity_score ASC 
      LIMIT ?
    `, [JSON.stringify(queryEmbedding), limit]);
    
    return result.rows.map((row: any) => ({
      id: row[0],
      event_type: row[1],
      vehicle_id: row[2],
      location: row[3],
      timestamp: row[4],
      metadata: row[5] ? JSON.parse(row[5]) : {},
      severity: row[6],
      description: row[7],
      similarity_score: row[8]
    }));
  } catch (error) {
    console.error('Vector search failed:', error);
    throw error;
  }
}

export async function vectorSearchSimilarVehicles(queryEmbedding: number[], vehicleType?: string, limit: number = 5) {
  const connection = getConnection();
  
  try {
    let query = `
      SELECT vehicle_id, vehicle_type, name, current_location, 
             battery_level, status, performance_metrics,
             VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
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
    
    return result.rows.map((row: any) => ({
      vehicle_id: row[0],
      vehicle_type: row[1],
      name: row[2],
      current_location: row[3],
      battery_level: row[4],
      status: row[5],
      performance_metrics: row[6] ? JSON.parse(row[6]) : {},
      similarity_score: row[7]
    }));
  } catch (error) {
    console.error('Vehicle vector search failed:', error);
    throw error;
  }
}

// Analytics and reporting functions
export async function getFleetAnalytics(days: number = 7) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      SELECT 
        vehicle_type,
        COUNT(*) as total_vehicles,
        AVG(battery_level) as avg_battery,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
        COUNT(CASE WHEN status = 'maintenance' THEN 1 END) as maintenance_count
      FROM vehicles 
      WHERE updated_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY vehicle_type
    `, [days]);
    
    return result.rows.map((row: any) => ({
      vehicle_type: row[0],
      total_vehicles: row[1],
      avg_battery: row[2],
      active_count: row[3],
      maintenance_count: row[4]
    }));
  } catch (error) {
    console.error('Error fetching fleet analytics:', error);
    throw error;
  }
}

export async function getEventAnalytics(days: number = 30) {
  const connection = getConnection();
  
  try {
    const result = await connection.execute(`
      SELECT 
        DATE(timestamp) as date,
        event_type,
        COUNT(*) as event_count,
        AVG(CASE WHEN severity = 'critical' THEN 1 ELSE 0 END) as critical_rate
      FROM logistics_events 
      WHERE timestamp >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(timestamp), event_type
      ORDER BY date DESC, event_count DESC
    `, [days]);
    
    return result.rows.map((row: any) => ({
      date: row[0],
      event_type: row[1],
      event_count: row[2],
      critical_rate: row[3]
    }));
  } catch (error) {
    console.error('Error fetching event analytics:', error);
    throw error;
  }
}

// Real-time data streaming simulation
export function startRealTimeDataStream(callback: (data: any) => void) {
  const interval = setInterval(async () => {
    try {
      // Generate realistic vehicle telemetry
      const vehicles = await getAllVehicles();
      
      for (const vehicle of vehicles.slice(0, 5)) { // Update first 5 vehicles
        const telemetryData = {
          vehicle_id: vehicle.vehicle_id,
          timestamp: new Date(),
          battery_level: Math.max(0, vehicle.battery_level - Math.random() * 2),
          location: vehicle.current_location,
          performance_metrics: {
            speed: Math.random() * 80,
            engine_temp: 80 + Math.random() * 20,
            fuel_efficiency: 8 + Math.random() * 4,
            vibration: Math.random() * 5
          }
        };
        
        // Update vehicle in database
        await connection.execute(`
          UPDATE vehicles 
          SET battery_level = ?, performance_metrics = ?, updated_at = CURRENT_TIMESTAMP
          WHERE vehicle_id = ?
        `, [
          telemetryData.battery_level,
          JSON.stringify(telemetryData.performance_metrics),
          vehicle.vehicle_id
        ]);
        
        callback(telemetryData);
      }
    } catch (error) {
      console.error('Real-time data stream error:', error);
    }
  }, 5000); // Update every 5 seconds
  
  return () => clearInterval(interval);
}