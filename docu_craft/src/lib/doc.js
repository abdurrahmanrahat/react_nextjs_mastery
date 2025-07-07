import fs from "fs"
import matter from "gray-matter"
import path from "path"
// import { remark } from "remark"
// import remarkHtml from "remark-html"

const postsDirectory = path.join(process.cwd(), "src/docs")


export function getDocuments(){
    const fileNames = fs.readdirSync(postsDirectory)

    const allDocuments = fileNames.map(fileName => {
        const id = fileName.replace(".md", "")

        const fullPath = path.join(postsDirectory, fileName)

        const fileContents = fs.readFileSync(fullPath, "utf8")

        const matteResult = matter(fileContents)

        return {
            id,
            ...matteResult.data
        }
    })

    return allDocuments.sort((a, b) => {
        if(a.order < b.order){
            return -1;
        } 
        if(a.order > b.order){
            return 1;
        } 

        return 0
    })
}