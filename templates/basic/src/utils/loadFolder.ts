import * as fs from "fs";
import { join as joinPath } from "path";

async function walks(path: string): Promise<string[]> {
    const paths: string[] = [];
    const promises = [];
    const dir = await fs.promises.opendir(path);

    for await (const dirent of dir) {
        const entry = joinPath(path, dirent.name);

        if (dirent.isDirectory()) {
            promises.push(walks(entry));
        } else if (dirent.isFile()) {
            paths.push(entry);
        }
    }

    (await Promise.all(promises)).map((res) => res.forEach((path) => paths.push(path)));

    return paths;
}

export async function loadFolder(path: string) {
    const paths = await walks(path);

    await Promise.all(paths.map((path) => import(`${process.cwd()}/${path}`)));
}
