
const DocContentPage = ({params}) => {
    console.log("params", params)
  return (
    <div>{params.docId}</div>
  )
}

export default DocContentPage