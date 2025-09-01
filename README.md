# LogiFlow AI - TiDB Serverless Logistics Platform

An intelligent logistics management platform powered by **TiDB Serverless** vector search and multi-step AI agents. This application showcases innovative agentic workflows that chain together data ingestion, vector search, TiDB AI analysis, and automated actions.

## 🚀 Key Features

### Multi-Step Agentic Workflows
1. **Predictive Maintenance Agent**
   - Ingests vehicle telemetry into TiDB Serverless
   - Uses vector search to find similar vehicle patterns
   - Chains LLM calls for maintenance analysis
   - Automatically schedules maintenance actions

2. **Intelligent Route Optimization**
   - Collects route data with vector embeddings
   - Searches similar successful routes using TiDB vector search
   - AI-powered route optimization with GPT-4
   - Updates systems with optimized recommendations

3. **Emergency Response Coordinator**
   - Logs emergency events with vector embeddings
   - Searches similar incident patterns
   - Generates AI response strategies
   - Automatically dispatches nearest vehicles

### TiDB Serverless Integration
- **Vector Search**: VECTOR(1536) columns with cosine similarity
- **Real-time Data**: Live ingestion and querying
- **JSON Metadata**: Flexible schema for complex logistics data
- **Scalable Architecture**: Serverless auto-scaling

## 🎯 What to Build - Hackathon Requirements

This project leverages **TiDB Serverless** (including vector search) on TiDB Cloud to create a working software application that showcases an innovative, multi-step, agentic solution. Our agent chains together multiple building blocks in automated workflows:

### 🔄 Multi-Step Workflow Implementation

| Step | Description | Implementation |
|------|-------------|----------------|
| **1. Ingest & Index Data** | Pull in vectors, full-text docs, images or logs into TiDB Serverless | Vehicle telemetry, route data, and emergency events stored with vector embeddings |
| **2. Search Your Data** | Query indexes with vector search to find similar cases | `VEC_COSINE_DISTANCE` for pattern matching across logistics scenarios |
| **3. Chain LLM Calls** | Call LLMs to analyze results and suggest next steps | GPT-4 analysis for maintenance predictions, route optimization, and emergency response |
| **4. Invoke External Tools** | Plug in APIs or services | Automated vehicle dispatch, maintenance scheduling, and system notifications |
| **5. Build Multi-Step Flow** | Wire everything together for end-to-end automation | Complete workflows from data ingestion to final action execution |

## 🛠 Technology Stack

### Core Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Database**: TiDB Serverless with vector search capabilities
- **AI Models**: OpenAI GPT-4, text-embedding-3-small
- **Backend**: Node.js, Express.js, WebSocket

### AI & Machine Learning
- **Vector Embeddings**: Text-embedding-3-small for semantic search
- **LLM Analysis**: GPT-4 for complex reasoning and recommendations
- **Multi-Step Agents**: Orchestrated workflows with chained AI calls
- **Predictive Analytics**: Time-series analysis and pattern recognition

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# TiDB Serverless Configuration
VITE_TIDB_HOST=your-cluster.clusters.tidb-cloud.com
VITE_TIDB_USERNAME=your-username
VITE_TIDB_PASSWORD=your-password
VITE_TIDB_DATABASE=your-database-name

# OpenAI Configuration
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 2. TiDB Serverless Setup

1. **Create TiDB Cloud Account**: Sign up at [tidbcloud.com](https://tidbcloud.com)
2. **Create Serverless Cluster**: Choose the free tier for development
3. **Get Connection Details**: Copy host, username, password, and database name
4. **Enable Vector Search**: Ensure your cluster supports vector operations

### 3. OpenAI API Setup

1. **Get API Key**: Visit [platform.openai.com](https://platform.openai.com)
2. **Create API Key**: Generate a new API key with appropriate permissions
3. **Add to Environment**: Set `VITE_OPENAI_API_KEY` in your `.env` file

### 4. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 5. Deployment

The application is deployed on Netlify. For your own deployment:

1. Fork this repository
2. Connect to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically on push

**Live Demo**: [https://gleaming-dango-a3fc18.netlify.app](https://gleaming-dango-a3fc18.netlify.app)

## 🤖 Agentic Workflow Architecture

### Step 1: Ingest & Index Data
- Vehicle telemetry, route data, and events stored in TiDB
- Vector embeddings generated using OpenAI's embedding model
- Data indexed with both structured and vector search capabilities

### Step 2: Search Your Data
- Vector similarity search using `VEC_COSINE_DISTANCE`
- Find patterns in historical data for predictive insights
- Combine vector search with traditional SQL queries

### Step 3: Chain LLM Calls
- GPT-4 analyzes search results and generates insights
- Multi-step reasoning for complex logistics decisions
- Context-aware recommendations based on similar cases

### Step 4: Invoke External Tools
- Automated vehicle dispatch and route updates
- Integration with maintenance scheduling systems
- Real-time notifications and alerts

### Step 5: Multi-Step Flow Completion
- End-to-end automation from data ingestion to action
- Feedback loops for continuous learning
- Performance tracking and optimization

## 📊 Database Schema

### Tables with Vector Support

```sql
-- Logistics events with vector embeddings
CREATE TABLE logistics_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  vehicle_id VARCHAR(50) NOT NULL,
  location TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSON,
  embedding VECTOR(1536) COMMENT "Vector embedding for semantic search",
  severity ENUM('low', 'medium', 'high', 'critical'),
  description TEXT
);

-- Vehicles with performance vectors
CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id VARCHAR(50) UNIQUE NOT NULL,
  vehicle_type ENUM('truck', 'drone') NOT NULL,
  current_location TEXT,
  battery_level INT DEFAULT 100,
  status VARCHAR(50) DEFAULT 'idle',
  embedding VECTOR(1536) COMMENT "Vector embedding for vehicle characteristics",
  performance_metrics JSON
);

-- Route optimizations with vector search
CREATE TABLE route_optimizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id VARCHAR(100) UNIQUE NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  waypoints JSON,
  optimization_score DECIMAL(5,2),
  embedding VECTOR(1536) COMMENT "Vector embedding for route characteristics",
  ai_recommendations TEXT
);
```

## 🎯 Demo Workflows

### Predictive Maintenance
1. **Input**: Vehicle ID (e.g., "TRK-001")
2. **Process**: Analyzes telemetry, searches similar vehicles, generates maintenance plan
3. **Output**: Maintenance schedule with AI recommendations

### Route Optimization
1. **Input**: Origin and destination locations
2. **Process**: Finds similar routes, optimizes path with AI analysis
3. **Output**: Optimized route with cost and time savings

### Emergency Response
1. **Input**: Emergency type and location
2. **Process**: Searches similar incidents, generates response strategy
3. **Output**: Coordinated emergency response with vehicle dispatch

## 🏆 Hackathon Highlights

- **TiDB Serverless**: Leverages vector search for semantic similarity
- **Multi-Step Agents**: Complex workflows with 5+ automated steps
- **Real-time Processing**: Live data ingestion and immediate insights
- **Production Ready**: Scalable architecture with proper error handling
- **Innovation**: Novel application of vector search in logistics

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd logiflow-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your TiDB Serverless and OpenAI credentials

4. **Initialize the database**
   - Run the application
   - Click "Initialize TiDB" in the TiDB AI Agent section

5. **Explore the workflows**
   - Navigate to "TiDB AI Agent" in the sidebar
   - Run the three demo workflows to see the multi-step agents in action

## 📱 Features Overview

### Dashboard
- Real-time fleet monitoring
- AI-powered insights and recommendations
- Interactive maps with live vehicle tracking
- Performance metrics and analytics

### Fleet Management
- Vehicle status monitoring
- Battery and maintenance tracking
- Route optimization
- Emergency response coordination

### AI Automation
- Predictive maintenance scheduling
- Dynamic route optimization
- Inventory rebalancing
- Emergency response protocols

### TiDB Integration
- Vector similarity search
- Real-time data ingestion
- JSON metadata storage
- Scalable serverless architecture

## 🔍 Technical Deep Dive

### Vector Search Implementation
```typescript
// Generate embeddings for semantic search
const embedding = await generateEmbedding(vehicleDescription);

// Search for similar vehicles using cosine similarity
const similarVehicles = await conn.execute(`
  SELECT vehicle_id, performance_metrics,
         VEC_COSINE_DISTANCE(embedding, ?) as similarity_score
  FROM vehicles 
  WHERE embedding IS NOT NULL
  ORDER BY similarity_score ASC 
  LIMIT 5
`, [JSON.stringify(embedding)]);
```

### Multi-Step Agent Workflow
```typescript
// Step 1: Ingest data with vector embeddings
await upsertVehicleData(vehicleData);

// Step 2: Search similar patterns
const similarVehicles = await searchSimilarVehicles(embedding);

// Step 3: Chain LLM analysis
const aiAnalysis = await openai.chat.completions.create({...});

// Step 4: Invoke external tools
await scheduleMaintenanceEvent(recommendations);

// Step 5: Complete workflow
return { success: true, recommendations, actions };
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **TiDB Cloud** for providing serverless vector search capabilities
- **OpenAI** for GPT-4 and embedding models
- **React** and **TypeScript** communities for excellent tooling
- **Tailwind CSS** for beautiful, responsive design

## 📞 Support

For questions or support:
- Create an issue in this repository
- Check the documentation in the `/docs` folder
- Review the demo workflows in the application

---

**Built with ❤️ for the TiDB Serverless Hackathon**

*Showcasing the power of vector search and multi-step AI agents in modern logistics management.*