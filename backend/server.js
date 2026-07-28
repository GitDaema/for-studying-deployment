// 의도적 장애 테스트용 코드
throw new Error("🚨 [EMERGENCY] 백엔드 심각한 장애 발생!");

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// process.env를 통해 환경 변수를 불러옵니다.
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    database: process.env.DB_NAME || 'myapp'
});

db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패:', err);
    } else {
        console.log('MySQL DB 연결 성공!');
    }
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, data: results });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});