import { useState } from 'react'
import './App.css'
import Canvas3d from './components/canvas-3d'
import GoodsList from './components/goods-list'

function App() {
  const [showCanvas, setShowCanvas] = useState<boolean>(true)

  return (
    <div>
      {showCanvas ? <Canvas3d close={() => { setShowCanvas(false) }}></Canvas3d> : <GoodsList></GoodsList>}
    </div>
  )
}

export default App
