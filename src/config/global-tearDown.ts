import path from 'path';
import AdmZip from 'adm-zip';
import envConfig from 'src/constants/envConfig';

async function globalTeardown() {
    const reportPath = path.join(__dirname, envConfig.reportFolder);
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath, envConfig.reportFolder);
    zip.writeZip(`./playwright-report.zip`);
}

export default globalTeardown;