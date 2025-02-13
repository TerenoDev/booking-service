const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createDirectory(directory) {
    return fs.promises.mkdir(directory, { recursive: true });
}

function createFile(filePath, content = '') {
    return fs.promises.writeFile(filePath, content);
}

async function generateMicroserviceStructure(microserviceName) {
    const baseDir = path.join(__dirname, microserviceName);
    const srcDir = path.join(baseDir, 'src');
    
    // Создание необходимых директорий
    await createDirectory(baseDir);
    await createDirectory(srcDir);
    await createDirectory(path.join(srcDir, 'models'));
    await createDirectory(path.join(srcDir, 'controllers'));
    await createDirectory(path.join(srcDir, 'routes'));
    await createDirectory(path.join(srcDir, 'services'));
    await createDirectory(path.join(srcDir, 'middleware'));
    await createDirectory(path.join(srcDir, 'config'));

    const dataSourceTemplate = await fs.promises.readFile(path.join(__dirname, './template/data-source.template.ts'), 'utf-8');
    const indexTemplate = await fs.promises.readFile(path.join(__dirname, './template/index.template.ts'), 'utf-8');

    // Файлы
    await createFile(path.join(srcDir, 'config', 'config.ts'), '// Конфигурация микросервиса');
    await createFile(path.join(srcDir, 'config', 'data-source.ts'), dataSourceTemplate);
    await createFile(path.join(srcDir, 'controllers', 'index.ts'), '// index');
    await createFile(path.join(srcDir, 'controllers', `${microserviceName.toLowerCase()}Controller.ts`), '// Контроллер');
    await createFile(path.join(srcDir, 'models', 'example.entity.ts'), '// Описание модели example');
    await createFile(path.join(srcDir, 'models', 'index.ts'), '// index');
    await createFile(path.join(srcDir, 'routes', `${microserviceName.toLowerCase()}Routes.ts`), '// Маршруты');
    await createFile(path.join(srcDir, 'routes', 'index.ts'), 'export default [];');
    await createFile(path.join(srcDir, 'services', `${microserviceName.toLowerCase()}Service.ts`), '// Сервис');
    await createFile(path.join(srcDir, 'services', 'index.ts'), '// index');
    await createFile(path.join(srcDir, 'middleware', 'authMiddleware.ts'), '// Middleware для авторизации');
    await createFile(path.join(srcDir, 'middleware', 'index.ts'), '// index');
    await createFile(path.join(srcDir, 'index.ts'), indexTemplate);

    // Чтение шаблонов и замена плейсхолдеров на имя микросервиса
    const packageTemplate = await fs.promises.readFile(path.join(__dirname, './template/package.template.json'), 'utf-8');
    const packageContent = packageTemplate.replace(/{{name}}/g, microserviceName);
    await createFile(path.join(baseDir, 'package.json'), packageContent);

    const tsconfigTemplate = await fs.promises.readFile(path.join(__dirname, './template/tsconfig.template.json'), 'utf-8');
    await createFile(path.join(baseDir, 'tsconfig.json'), tsconfigTemplate);

    console.log(`Структура для микросервиса "${microserviceName}" успешно создана!`);
}

// Запуск скрипта
rl.question('Введите имя микросервиса: ', (microserviceName) => {
    generateMicroserviceStructure(microserviceName)
        .catch(err => {
            console.error('Произошла ошибка:', err);
        })
        .finally(() => {
            rl.close();
        });
});
