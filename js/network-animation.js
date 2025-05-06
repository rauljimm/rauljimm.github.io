// Red de conexiones 3D con Anime.js
document.addEventListener('DOMContentLoaded', () => {
    // Crear canvas para la animación y añadirlo como fondo
    const networkCanvas = document.createElement('canvas');
    networkCanvas.id = 'network-canvas';
    document.body.appendChild(networkCanvas);
    
    // Establecer estilos CSS para el canvas
    networkCanvas.style.position = 'fixed';
    networkCanvas.style.top = '0';
    networkCanvas.style.left = '0';
    networkCanvas.style.width = '100%';
    networkCanvas.style.height = '100%';
    networkCanvas.style.zIndex = '-1';
    networkCanvas.style.opacity = '0.2';
    networkCanvas.style.pointerEvents = 'none';
    
    // Obtener el contexto 2D para dibujar
    const ctx = networkCanvas.getContext('2d');
    
    // Ajustar el tamaño del canvas al del viewport
    function resizeCanvas() {
        networkCanvas.width = window.innerWidth;
        networkCanvas.height = window.innerHeight;
    }
    
    // Llamar a resize cuando cambie el tamaño de la ventana
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Clase para los nodos de la red
    class Node {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.originalX = x;
            this.originalY = y;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.connections = [];
            this.animObj = { 
                scale: Math.random() * 0.5 + 0.5, 
                opacity: Math.random() * 0.5 + 0.5 
            };
        }
        
        // Dibujar nodo
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * this.animObj.scale, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.animObj.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        
        // Actualizar posición
        update() {
            this.x += this.vx * 0.3;
            this.y += this.vy * 0.3;
            
            // Mantener dentro del canvas con rebote suave en los bordes
            if (this.x < this.radius || this.x > networkCanvas.width - this.radius) {
                this.vx *= -1;
            }
            if (this.y < this.radius || this.y > networkCanvas.height - this.radius) {
                this.vy *= -1;
            }
            
            // Limitar distancia máxima del punto original
            const dx = this.x - this.originalX;
            const dy = this.y - this.originalY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            
            if (distance > maxDistance) {
                this.x = this.originalX + (dx / distance) * maxDistance;
                this.y = this.originalY + (dy / distance) * maxDistance;
                this.vx *= -0.9;
                this.vy *= -0.9;
            }
        }
    }
    
    // Inicializar nodos
    const nodes = [];
    const nodeCount = 50; // Ajustar según la densidad deseada
    const connections = [];
    const maxDistance = 200; // Distancia máxima para conexiones
    
    function initNodes() {
        const colors = ['rgba(107, 93, 246, 0.8)', 'rgba(129, 115, 249, 0.8)', 'rgba(67, 56, 202, 0.8)'];
        
        for (let i = 0; i < nodeCount; i++) {
            const x = Math.random() * networkCanvas.width;
            const y = Math.random() * networkCanvas.height;
            const radius = Math.random() * 3 + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];
            nodes.push(new Node(x, y, radius, color));
        }
    }
    
    // Dibujar conexiones entre nodos cercanos
    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Opacidad basada en la distancia (más cercanas = más opacas)
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(107, 93, 246, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Función principal de animación
    function animate() {
        ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
        
        // Dibujar conexiones
        drawConnections();
        
        // Actualizar y dibujar nodos
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación
    initNodes();
    
    // Animar los nodos con Anime.js
    nodes.forEach(node => {
        anime({
            targets: node.animObj,
            scale: [
                { value: Math.random() * 0.5 + 0.5, duration: 1000 },
                { value: Math.random() * 0.5 + 0.5, duration: 1000 }
            ],
            opacity: [
                { value: Math.random() * 0.3 + 0.3, duration: 800 },
                { value: Math.random() * 0.5 + 0.5, duration: 800 }
            ],
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            delay: Math.random() * 1000
        });
    });
    
    // Efecto de movimiento de partículas según el movimiento del ratón
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Mover ligeramente los nodos en la dirección del ratón
        nodes.forEach(node => {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                
                node.vx -= Math.cos(angle) * force * 0.2;
                node.vy -= Math.sin(angle) * force * 0.2;
            }
        });
    });
    
    // Iniciar el bucle de animación
    animate();
}); 