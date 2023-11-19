import React, { useState } from 'react'
import * as geolib from 'geolib'
var geolocation = require('geolocation')

function Attendance() {
  const [text, setText] = useState('')
  const inButtonHandler = () => {
    setText('setting attendance')
    navigator.geolocation.getCurrentPosition(
      (position, err) => {
        setText('here')
        if (err) {
          setText('error')
        }
        if (!position) {
          setText('no Position')
        }
        if (position) {
          setText('position')
          let { latitude, longitude } = position.coords
          console.log(latitude, longitude)
        }
      }
    )
    // geolocation.getCurrentPosition(function (err, position) {
    //   if (err) {
    //     // throw err
    //     console.log(err)
    //     setText(err)
    //   }

    //   if (!position) {
    //     setText('no location')
    //   }
    //   if (position) {
    //     console.log(position)
    //     let { latitude, longitude } = position.coords

    //     let isInRegion = geolib.isPointInPolygon(
    //       // { latitude: 19.95441, longitude: 73.771092 },  // my home coordinates
    //       { latitude, longitude },
    //       [
    //         { latitude: 19.97546, longitude: 73.77345 },
    //         { latitude: 19.94157, longitude: 73.74152 },
    //         { latitude: 19.91995, longitude: 73.79611 },
    //         { latitude: 19.96239, longitude: 73.82186 }
    //       ]
    //     )

    //     if (isInRegion) {
    //       setText('Attendance successfully done.')
    //     } else {
    //       setText('You are not in office.')
    //     }
    //   }
    // })
  }

  const outButtonHandler = () => {
    console.log('out button handler')
  }

  return (
    <>
      <h1>{text}</h1>
      <div>Attendance</div>

      <button onClick={inButtonHandler}> In </button>
      <button onClick={outButtonHandler}>Out</button>
    </>
  )
}

export default Attendance

// setText('You are not in office.')
// navigator.geolocation.getCurrentPosition(
//   (position, err) => {
//     if (position) {
//       let isInRegion = geolib.isPointInPolygon(
//         // { latitude: 19.95441, longitude: 73.771092 },  // my home coordinates
//         { latitude: 19.95441, longitude: 73.771092 },
//         [
//           { latitude: 19.97546, longitude: 73.77345 },
//           { latitude: 19.94157, longitude: 73.74152 },
//           { latitude: 19.91995, longitude: 73.79611 },
//           { latitude: 19.96239, longitude: 73.82186 }
//         ]
//       )

//       if (isInRegion) {
//         setText('Attendance successfully done.')
//       } else {
//         setText('You are not in office.')
//       }
//     }

//     if (err) {
//       console.log(err)
//     }
//   }
// )
