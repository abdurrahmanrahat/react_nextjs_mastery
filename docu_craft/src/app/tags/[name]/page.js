import ContentDisplay from "@/components/Docs/ContentDisplay"
import { getDocuments } from "@/lib/doc"
import { getDocumentsByTag } from "@/utils/docs.utils"

const TagsPage = ({ params: { name } }) => {
    const docs = getDocuments()
    const matchedDocuments = getDocumentsByTag(docs, name)
    
    return (
        <ContentDisplay contentId={matchedDocuments[0].id} />
    )
}

export default TagsPage