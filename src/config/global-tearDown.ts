import path from 'path';
import AdmZip from 'adm-zip';

async function globalTeardown() {
    const reportPath = path.join(__dirname, `./reports/playwright-report`);
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath, "./reports/playwright-report");
    zip.writeZip(`./playwright-report.zip`);
}

export default globalTeardown;