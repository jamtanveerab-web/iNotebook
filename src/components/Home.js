import Notes from './Notes.js';


const Home = (props) => {
  const {showAlert} = props
  return (
    <div style={{backgroundColor:"#F9FAFB"}}>
            <Notes showAlert={showAlert}/>
    </div>
    
  )
}

export default Home
