import Header from "./Header.jsx"
import Articles from "./Articles.jsx"

function Featured() {


  return (
    <div className='main'>
        <Header />
        <Articles showFeaturedOnly={true}/>
    </div>
  )
}

export default Featured;
