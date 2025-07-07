import ContentDisplay from "@/components/Docs/ContentDisplay"

const SubContentPage = ({params}) => {
    console.log("params", params)
  return (
    <ContentDisplay contentId={params.subContentId} />
  )
}

export default SubContentPage