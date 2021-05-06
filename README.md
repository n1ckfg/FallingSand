# Falling Sand Sim

Just a basic falling sand simulator I'm making for fun to practise p5/processing, Javascript, and maybe some HTML & CSS.

[You can play with it here](https://obviousnonsense.github.io/FallingSand/)

## Particle Types:
- Sand: Falls. Piles up. Sinks in & displaces water.
- Water: Flows.
- Walls: Stop other things.
- Plants: Consume water and grow in weird patterns.
-

## To Do:
- Add button to reset sim
- Add button to resize canvas
- Clean up UI?
- Add Particle types:
    - Generators
        - <s>Water</s>
        - <s>Sand</s>
    - <s>Plant: Consumes water and grows.</s>
    - Wood walls
    - Fire
    - Steam
    - Smoke
- Improve performance? I've tried multiple things to increase the number of particles that can be drawn without dropping frames, but I think I'm at the limit of what I can do with p5/HTML canvas.