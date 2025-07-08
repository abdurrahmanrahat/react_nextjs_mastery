import ContentDisplay from "@/components/Docs/ContentDisplay"
import { getDocuments } from "@/lib/doc"

const { getDocumentsByAuthor } = require("@/utils/docs.utils")

const AuthorsPage = ({params: {name}}) => {
    const docs = getDocuments()
    const matchedDocuments = getDocumentsByAuthor(docs, name)
    
    return (
        <ContentDisplay contentId={matchedDocuments[0].id} />
    )
}

export default AuthorsPage