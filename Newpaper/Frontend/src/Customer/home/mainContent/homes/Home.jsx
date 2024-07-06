import React from "react"
import Side from "../../sideContent/side/Side"
import Popular from "../popular/Popular"
import Ppost from "./Ppost/Ppost"
import ForYou from "./ForYou/ForYou"
import Interested from "./interested/interested"
import "./style.css"

const Homes = () => {
  return (
    <>
      <main>
        <div className='container'>
          <section className='mainContent'>
            <Popular />
            <Ppost />
            <ForYou />
            <Interested />
          </section>
          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>
    </>
  )
}

export default Homes
