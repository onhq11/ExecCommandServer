const http = require('http')
const { exec } = require('child_process')

const port = 41420
const tv_on_script = '/home/onhq/tvScripts/tv_on.sh' //NOT REQUIRED
const tv_off_script = '/home/onhq/tvScripts/tv_off.sh' //NOT REQUIRED

const initialStartup = () => {
    console.log(`\n\n----------------- STARTUP COMMANDS -----------------\n`)

    execCommand(`sudo echo 20 > /sys/class/gpio/export`)
    execCommand(`sudo echo "out" > /sys/class/gpio/gpio20/direction`)

    execCommand(`sudo echo 21 > /sys/class/gpio/export`)
    execCommand(`sudo echo "out" > /sys/class/gpio/gpio21/direction`)

    setTimeout(function(){
        console.log(`\n\n\n\n\n\n\n----------------- SERVER IS READY -----------------\n`)
    }, 3000)
}

const execCommand = async (command) => {
    await exec(command, (err, stdout, stderr) => {
        if(err) {
            console.log('ERR: '+err.message)
            return
        }

        if(stderr) {
            console.log('STDERR: '+stderr)
            return
        }

        console.log(`Command executed successfuly: ${command}\n\nOUT: ${stdout}`)
        return
    })
}

const requestListener = (req, res) => {
    if(req.url !== '/favicon.ico') {
        console.log(`\n\n----------------- ${req.url} -----------------\n`)
    }

    if(req.url.includes('export') && !req.url.includes('unexport')) {
        execCommand(`sudo echo ${req.url.substring(7)} > /sys/class/gpio/export`)
    }

    if(req.url.includes('unexport')) {
        execCommand(`sudo echo ${req.url.substring(9)} > /sys/class/gpio/unexport`)
    }

    if(req.url.includes('out')) {
        execCommand(`sudo echo "out" > /sys/class/gpio/gpio${req.url.substring(4)}/direction`)
    }

    if(req.url.includes('gpio')) {
        execCommand(`sudo echo ${req.url.substring(req.url.length-1)} > /sys/class/gpio${req.url.substring(0, req.url.length-2)}/value`)
    }

    //OPTIONAL PERSONAL SCRIPTS

    if(req.url.includes('tv')) {
        if(req.url.includes('on')) {
            execCommand(`bash ${tv_on_script}`)
        }

        if(req.url.includes('off')) {
            execCommand(`bash ${tv_off_script}`)
        }
    }

    //END

    res.writeHead(200)
    res.end('{"result": "success"}')
}

const server = http.createServer(requestListener)
server.listen(port, () => {
    console.log('Server is running on port {'+port+'}')
    initialStartup()
})