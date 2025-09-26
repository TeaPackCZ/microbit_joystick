function pack_values (num: number, num2: number) {
    return (Math.round(num) + 100) * 1000 + (Math.round(num2) + 100) * 1
}
joystickbit.initJoystickBit()
radio.setGroup(69)
basic.showIcon(IconNames.Heart)
loops.everyInterval(500, function () {
    radio.sendValue("ping", 1)
})
loops.everyInterval(100, function () {
    radio.sendValue("run", pack_values(Math.map(joystickbit.getRockerValue(joystickbit.rockerType.X), 0, 1023, 100, -100), Math.map(joystickbit.getRockerValue(joystickbit.rockerType.Y), 0, 1023, -100, 100)))
})
