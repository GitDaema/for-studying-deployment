const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB 접속 정보 (환경 변수로 설정하고, 없을 경우 기본값 사용)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',            // Docker Compose의 DB 서비스 이름
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'myapp',
    waitForConnections: true,
    connectionLimit: 10
});

// GET /api/users API (실제 DB 테이블 조회)
app.get('/api/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('DB Query Error:', err);
            return res.status(500).json({ success: false, message: 'DB 접속 오류' });
        }
        res.json({ success: true, data: results });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});