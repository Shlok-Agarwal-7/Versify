const PageHeaders = ({
    h1text = "hello",
    h2text = "subheader"
}) => {
  return (
      <>
        <div className="mb-4 text-white text-center mt-16">
          <h1 className="text-2xl">
            {h1text}
          </h1>
          <h2>{h2text}</h2>
        </div>
      </>
  )
}

export default PageHeaders
