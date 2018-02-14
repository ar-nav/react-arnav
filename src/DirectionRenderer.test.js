import React from 'react'
import ReactDOM from 'react-dom'
import expect, { createSpy } from 'expect'
import geolib from 'geolib'
import { shallow, mount, configure } from 'enzyme'
import renderer from 'react-test-renderer';

import Switch from 'material-ui/Switch'
import InfoIcon from 'material-ui-icons/Info'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'


import { directionRendererFactory, getAngle, compassHeading } from './components/direction/DirectionRenderer'

describe ('Direction Renderer', () => {
const DirectionRenderer = directionRendererFactory({
    THREE: {
        Camera: createSpy(),
        Group: createSpy().andReturn({ add: createSpy() }),
        Scene: createSpy().andReturn({ add: createSpy() }),
        Texture: createSpy().andCall(image => ({ image })),
    },
    getMarker: createSpy().andReturn({
        addEventListener: createSpy(),
    }),
    initializeArToolkit: createSpy(),
    initializeRenderer: createSpy().andReturn({ render: createSpy() }),
    requestAnimationFrame: createSpy()
});
  // it('Should renders correctly', () => {
  //   // const div = document.createElement('div');
  //   let props = {
  //     coords: {
  //       latitude: 0,
  //       longitude: 0
  //     },
  //     targetLoc : {
  //       latitude: 100,
  //       longitude: 200,
  //     },
  //     currentLoc :{
  //       latitude: 0,
  //       longitude: 0
  //     }

  //   }
  //   // let directionRenderer = ReactDOM.render(<DirectionRenderer {...props} />, div);
  //   const tree = renderer
  //   .create(<DirectionRenderer {...props} />)
  //   .toJSON();
  // expect(tree).toMatchSnapshot();
  // })

  it('Get Angle should get correct angle', () => {
    let targetLoc = {
      latitude: 1,
      longitude: 1
    }
    let currentLoc = {
      latitude: 0,
      longitude: 0
    }
    let result = Math.round(getAngle(targetLoc, currentLoc),4)
    expect(result).toEqual(-Math.round(Math.PI/4,4))
  })

  it('Compass heading should get correct heading calculation', () => {
    let alpha = 10,
      beta = 20,
      gamma = 30
    let result = compassHeading(alpha, beta, gamma)
    expect(result).toEqual(290.642342047956)
  })

  it ('Should get distance correctly', () => {
    const div = document.createElement('div');
    let props = {
      coords: {
        latitude: 0,
        longitude: 0
      },
      targetLoc : {
        latitude: 100,
        longitude: 200,
      },
      currentLoc :{
        latitude: 0,
        longitude: 0
      }

    }
    let directionRenderer = ReactDOM.render(<DirectionRenderer {...props} />, div);
    let targetLoc = {
      latitude: 100,
      longitude: 200,
    }
    let currentLoc = {
      latitude: 0,
      longitude: 0
    }
    directionRenderer.getDistance(currentLoc, targetLoc)
  })

  it ('Should handle dial click correctly', () => {
    const div = document.createElement('div');
    let props = {
      coords: {
        latitude: 0,
        longitude: 0
      },
      targetLoc : {
        latitude: 100,
        longitude: 200,
      },
      currentLoc :{
        latitude: 0,
        longitude: 0
      }
    }
    let directionRenderer = ReactDOM.render(<DirectionRenderer {...props} />, div);
    let targetLoc = {
      latitude: 100,
      longitude: 200,
    }
    let currentLoc = {
      latitude: 0,
      longitude: 0
    }
    let event= {
      currentTarget: true
    }
    console.log(directionRenderer)
    directionRenderer.handleClick(event)
    
  })

})

