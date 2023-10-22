const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const app = express();
const port = 8081;

app.use(cors());

app.get('/log_classes.json', async (req, res) => {
    try {
        const jsonData = await fs.readFile('dataInput.json', 'utf8');
        const parsedData = JSON.parse(jsonData);
        const rowIndex = 0; // Укажите здесь нужный индекс строки
        res.json(parsedData[rowIndex]);
    } catch (error) {
        console.error('Ошибка чтения файла:', error);
        res.status(500).json({ error: 'Ошибка чтения файла' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});