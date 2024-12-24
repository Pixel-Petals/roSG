
<div style="display: flex; margin-top: 50px; max-width: 700px;">

<div style="flex: 0 0 150px;">
<div style="position: fixed; max-width: 150px;">

**Lottie-Roku**<br>
[Description](#lottie-roku)<br>
[Usage](#usage)<br>

**roSG.Lottie**<br>
[Description](#rosglottie)<br>
[Static Methods](#static-methods)<br>
[Instance Properties](#instance-properties)<br>

**bsc-lottie**<br>
[Description](#bsc-lottie)<br>

**lottie-roku-transformer**<br>
[Description](#lottie-roku-transformer)<br>

</div></div>

<div style="flex: 1 1">

# Lottie-Roku

## Usage

The Lottie-Roku SDK is broken into 3 parts:

1. roSG.Lottie—a Roku/BrightScript component for loading and controlling lottie animations.
2. bsc-lottie—a brighterscript plugin that bakes local lottie json files into png sequences at build-time.
3. transform-lottie-to-roku—a node script that takes lottie json and renders it into an animated .png sequence (`.apng`).

# roSG.Lottie

## Static Methods

### `Lottie.Load (path, options = invalid) as node`

Given a path and options, this loads the requested lottie data and returns a lottie animation instance that you can control with play, pause, setSpeed, etc. This call uses a caching mechanism to minimize duplicate effort & load times.

| Return Value | Description |
|--|--|
| `node <roSG.Lottie>` | A lottie animation instance that you can control. |

| Parameter | Type | Default | Description |
|--|--|--|--|
| path `[REQUIRED]` | `string` or `node` | | local or network path to the lottie json. If set to another lottie instance, it will clone the lottie instance. |
| options | `assocarray` | | additional properties to customize the lottie animation. |
| options.id | `string` | random guid | id for the animation. |
| options.parent | `node` | the current node (`m.top`) | node to append the animation to. |
| options.loop | `boolean` or `integer` | `false` | indicates if the animation should loop. If a number N is provided, it will loop N number of times. |
| options.autoplay | `boolean` | `false` | indicates if the animation should start playing immediately after it is loaded. |
| options.optional | `boolean` | `false` | indicates if the animation is optional. If set to true, the animation will be skipped on lower-performing devices. |

### `Lottie.Destroy (animation) as boolean`

Given a Lottie animation instance, it performs cleanup and detaches the animation from the node tree.

| Return Value | Description |
|--|--|
| `boolean` | Indicates if the instance was successfully destroyed. |

## Instance Properties

| Property | Type | Default | Description |
|--|--|--|--|
| id | `string` | random guid | Adds a dictionary entry that allows the node to be retrieved with ifSGNodeDict findNode() function. |
| control | `string` | empty string | `start`—Plays the animation from the beginning <br> `stop`—Stops the animation in its current state. <br> `pause`—Pauses the animation in its current state. <br> `resume`—If paused, resumes the animation from its current state. If the animation is not paused, plays the animation from the beginning. <br> `finish`—Jumps to the end of the animation, then stops. |
| state | `string` | empty string | `loading`—Indicates that the lottie json is being downloaded and prepared for rendering. <br> `error`—Indicates that an error was encountered while trying to load or play the lottie animation. <br> `running`—Indicates that the animation is in progress. <br> `paused`—Indicates that the animation has been paused. <br> `stopped`—Indicates that the animation has either run to completion or has been explicitly stopped. <br> |
| loop | `boolean` | `false` | Indicates if the animation will loop. |
| loopTimes | `integer` | `0` | Indicates the maximum number of times that the animation will loop. |
| autoplay | `boolean` | `false` | Indicates if the animation will play immediately after it is loaded. |
| delay | `float` (seconds) | `0` | Delays the start of the animation by the specified number of seconds. |
| optional | `boolean` | `false` | Set to `true` to skip the animation on lower-performing Roku devices. |
| willBeSkipped | `boolean` | `false` | Indicates whether the animation will run or jump to the end (effectively skipping the animation and rendering it in its final state.) |
| error | `assocarray` | | An object with details about the error encountered. |

# bsc-lottie

# lottie-roku-transformer

</div></div>
