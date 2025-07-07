import ContentDisplay from "@/components/Docs/ContentDisplay"

const ContentPage = ({params}) => {
    console.log("params", params)
  return (
    <ContentDisplay contentId={params.contentId} />
  )
}

export default ContentPage