import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

//! Fonts
const loader = new THREE.FontLoader()
loader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: .5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // ~ The ezzzz way to center the text
        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        //~ The correct and easier way
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 16)
        for (let i = 0; i < 500; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            const box = new THREE.Mesh(boxGeometry, material)
            const sphere = new THREE.Mesh(sphereGeometry, material)

            donut.position.x = (Math.random() - .5) * 50
            donut.position.y = (Math.random() - .5) * 50
            donut.position.z = (Math.random() - .5) * 50

            box.position.x = (Math.random() - .5) * 50
            box.position.y = (Math.random() - .5) * 50
            box.position.z = (Math.random() - .5) * 50

            sphere.position.x = (Math.random() - .5) * 50
            sphere.position.y = (Math.random() - .5) * 50
            sphere.position.z = (Math.random() - .5) * 50

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI


            box.rotation.x = Math.random() * Math.PI
            box.rotation.y = Math.random() * Math.PI

            sphere.rotation.x = Math.random() * Math.PI
            sphere.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            box.scale.set(scale, scale, scale)
            sphere.scale.set(scale, scale, scale)

            scene.add(donut, box, sphere)
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 60
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()