Timelive is a tool for displaying interactively a timeline of events, multiple familiy trees and so on

The data displayed depends on the amount of information available to that point (Es: ep 5 in a serie or min 00:35:10 in a movie)

This allows a complete understanding of what can be known while avoiding all possible spoilers



## TODO
- [x] introduce a basic structure that can change overtime
- [x] implement a basic keyboard controller
- [x] Introduce bundler and rework the code structure
- [x] define an entity
- [ ] define possible connections between entities
- [ ] define all possible interaction of events
- [ ] implement a drawing system
- [ ] introduce saving project in local storage


# Keyboard commands
## In the home
- ```←, →``` Move trough the timeline
- ```N``` New element
- ```S``` Open Settings
- ```Mouse click``` Open element

## On create / update elemenet
- ```TAB``` Default movement between slots
- ```Enter``` Save the element
- ```Escape``` Close element

## On settings
- ```Escape``` Close settings


# Local setup
## Requirements
npm and webpack are required to create the bundle
after the initial setup launch the command  'npx webpack'



Entity  
entity is anything relevant in the media, it can have relation to any other entity example:
2 entities are married
1 entity is child of 1 entities
1 entity (person) owns another entity(object)



Event
event includes any valuable interaction between 1 or more entities
event example:
E1 and E2 meet talk for the first time
E4 dies of age
E3 find E5(obj) and keep it
...
















