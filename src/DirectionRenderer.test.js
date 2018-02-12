import React from 'react'
import ReactDOM from 'react-dom'
import expect, { createSpy } from 'expect'
import geolib from 'geolib'
import { shallow, mount, configure } from 'enzyme'

import Switch from 'material-ui/Switch'
import InfoIcon from 'material-ui-icons/Info'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'

import { directionRendererFactory, getAngle, compassHeading, DirectionRenderer } from './components/direction/DirectionRenderer'

describe ('Direction Renderer', () => {
  const mesh = {
    position: {},
    scale: {},
    rotation: {},
}
const material = {}
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
  it('Should lbasdfkjbasg', () => {

  })

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

  it('should render component correctly', () => {
    const wrapper = shallow(<DirectionRenderer />)
    expect(wrapper.containsAllMatchingElements([
      <div/>,
      <canvas id="arpage"></canvas>,
      <Button/>,
      <FormGroup/>,
      <MenuItem/>,
      <FormControlLabel/>,
      <Switch/>,
      <InfoIcon/>
    ])).toBe.true
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
})

