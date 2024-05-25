const express = require('express');
const fs = require('fs');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos como tu HTML

app.post('/generate-excel', (req, res) => {
    const { nombre } = req.body;
    const filename = 'asistencias.xlsx';

    let workbook;
    let worksheet;

    if (fs.existsSync(filename)) {
        // Si el archivo existe, cargar el libro y la hoja de cálculo existente
        workbook = xlsx.readFile(filename);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // Añadir nuevos datos
        const newData = [[nombre, 'Asistirá']];
        xlsx.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });
    } else {
        // Si el archivo no existe, crear un nuevo libro y hoja
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.aoa_to_sheet([['Nombre', 'Confirmación'], [nombre, 'Asistirá']]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Asistencias');
    }

    // Guardar el archivo
    xlsx.writeFile(workbook, filename);

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
