State: Animals
==============

- State:
	- currentState:
		- slideshow: String = `'idle' | 'running'`
		- interval: TimingString
		- currentAnimal: Index - Index of an Animal selected from `state.animals`.
		- currentSessionAnimals: Array<Index> - Array of the Animal Images that were shown this session.
		- animalShuffle: Shuffle - Holds the Animal Images to deal out.
		- currentAnimalImage: Index - Index of the currently dealt Animal Image.
		- animalsLoading: Map<Index, String> = `{[index]: (undefined | 'loading' | 'completed' | 'failed') }`
	- animals: Array<String>
	- animalImages: Array<Array<String>> - Sparse array of Animal Images arrays.

- TimingString:
	- String in the form of `/^\d+s$/` or `'Infinity'`

- InitialState:
	- currentState:
		- slideshow: 'idle'
		- interval: '30s'
		- currentAnimal: NaN
		- currentSessionAnimals: []
		- currentAnimalImage: null
		- animalShuffle: null
	- animals: []



Actions
-------

### User Actions

These actions are usually caused by the User, though can be caused by other things too.

- `selectTime( time: TimingString )`
- `selectAnimal( index: Index )`
- `startSession()`
- `stopSession()`
- `nextImage()`


### Other Actions

These actions are never caused by the user.

- `setAnimals( animals: Array<String> )`



Starting a Session
------------------

Obviously, there's just the `startSession` action, but we also need to use this moment to set up the image shuffle.  After that, we need to immediately pick out the first image.

I think the easiest way to do this is to just preemptively dispatch `nextImage` after dispatching `startSession`.
