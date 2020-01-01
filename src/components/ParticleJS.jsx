import React from 'react';
import Particles from 'react-particles-js';

export default function ParticleJS() {
  return (
    <div id="particles-js">
      <Particles
        params={{
          fps_limit: 40,
          particles: {
            number: {
              value: 100
            },
            size: {
              value: 3
            }
          }
        }}
      />
    </div>
  );
}
