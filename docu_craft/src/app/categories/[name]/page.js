import ContentDisplay from "@/components/Docs/ContentDisplay"
import { getDocuments } from "@/lib/doc"
import { getDocumentsByCategory } from "@/utils/docs.utils"

const CategoriesPage = ({params: {name}}) => {
    const docs = getDocuments()
    const matchedDocuments = getDocumentsByCategory(docs, name)
    
    return (
        <ContentDisplay contentId={matchedDocuments[0].id} />
    )
}

export default CategoriesPage