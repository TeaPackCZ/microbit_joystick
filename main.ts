joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.up, function () {
    radio.sendValue("btn", 13)
})
function in_run_calibration (x: number, y: number) {
    if (x < x_right) {
        x_right = x
    }
    if (x > x_left) {
        x_left = x
    }
    if (y < y_bottom) {
        y_bottom = y
    }
    if (y > y_top) {
        y_top = y
    }
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    radio.sendValue("btn", 5)
})
// button B is used for calibration of joystick hat
function calibrate_joystick_hat () {
    basic.showLeds(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    center_y = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    center_x = joystickbit.getRockerValue(joystickbit.rockerType.X)
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    x_right = joystickbit.getRockerValue(joystickbit.rockerType.X)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    x_left = joystickbit.getRockerValue(joystickbit.rockerType.X)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    y_top = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    while (!(input.buttonIsPressed(Button.B))) {
        basic.pause(10)
    }
    y_bottom = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    basic.showIcon(IconNames.Heart)
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.up, function () {
    radio.sendValue("btn", 14)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    radio.sendValue("btn", 6)
})
function pack_values (num: number, num2: number) {
    return (Math.round(num) + 100) * 1000 + (Math.round(num2) + 100) * 1
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.up, function () {
    radio.sendValue("btn", 16)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.up, function () {
    radio.sendValue("btn", 15)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    radio.sendValue("btn", 4)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    radio.sendValue("btn", 3)
})
let hat_y = 0
let hat_x = 0
let center_x = 0
let center_y = 0
let y_top = 0
let y_bottom = 0
let x_left = 0
let x_right = 0
joystickbit.initJoystickBit()
radio.setGroup(69)
basic.showIcon(IconNames.Heart)
calibrate_joystick_hat()
loops.everyInterval(101, function () {
    hat_x = joystickbit.getRockerValue(joystickbit.rockerType.X)
    hat_y = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    in_run_calibration(hat_x, hat_y)
    radio.sendValue("run", pack_values(Math.map(hat_x, x_left, x_right, -100, 100), Math.map(hat_y, y_bottom, y_top, -100, 100)))
})
loops.everyInterval(500, function () {
    radio.sendValue("ping", 1)
})
