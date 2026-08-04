"use client";import{o as e,t}from"./react.BHk431b0.js";import{t as n}from"./jsx-runtime.DtQc8_p0.js";import{t as r}from"./next-link.B-VpaPhx.js";var i=e(t()),a=n(),o=`#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}

void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.15,-st.y));
	uv*=1.-.3*(sin(T*.1)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.15+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
	}
	O=vec4(col,1);
}`,s=class{constructor(e,t){this.program=null,this.vs=null,this.fs=null,this.buffer=null,this.mouseMove=[0,0],this.mouseCoords=[0,0],this.pointerCoords=[0,0],this.nbrOfPointers=0,this.uniformResolution=null,this.uniformTime=null,this.uniformMove=null,this.uniformTouch=null,this.uniformPointerCount=null,this.uniformPointers=null,this.vertexSrc=`#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`,this.vertices=[-1,1,-1,-1,1,1,1,-1],this.canvas=e,this.scale=t,this.gl=e.getContext(`webgl2`),this.gl.viewport(0,0,e.width*t,e.height*t),this.shaderSource=o}updateShader(e){this.reset(),this.shaderSource=e,this.setup(),this.init()}updateMove(e){this.mouseMove=e}updateMouse(e){this.mouseCoords=e}updatePointerCoords(e){this.pointerCoords=e}updatePointerCount(e){this.nbrOfPointers=e}updateScale(e){this.scale=e,this.gl.viewport(0,0,this.canvas.width*e,this.canvas.height*e)}compile(e,t){let n=this.gl;if(n.shaderSource(e,t),n.compileShader(e),!n.getShaderParameter(e,n.COMPILE_STATUS)){let t=n.getShaderInfoLog(e);console.error(`Shader compilation error:`,t)}}test(e){let t=null,n=this.gl,r=n.createShader(n.FRAGMENT_SHADER);return n.shaderSource(r,e),n.compileShader(r),n.getShaderParameter(r,n.COMPILE_STATUS)||(t=n.getShaderInfoLog(r)),n.deleteShader(r),t}reset(){let e=this.gl;this.program&&!e.getProgramParameter(this.program,e.DELETE_STATUS)&&(this.vs&&(e.detachShader(this.program,this.vs),e.deleteShader(this.vs)),this.fs&&(e.detachShader(this.program,this.fs),e.deleteShader(this.fs)),e.deleteProgram(this.program))}setup(){let e=this.gl;this.vs=e.createShader(e.VERTEX_SHADER),this.fs=e.createShader(e.FRAGMENT_SHADER),this.compile(this.vs,this.vertexSrc),this.compile(this.fs,this.shaderSource),this.program=e.createProgram(),e.attachShader(this.program,this.vs),e.attachShader(this.program,this.fs),e.linkProgram(this.program),e.getProgramParameter(this.program,e.LINK_STATUS)||console.error(e.getProgramInfoLog(this.program))}init(){let e=this.gl,t=this.program;this.buffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.buffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array(this.vertices),e.STATIC_DRAW);let n=e.getAttribLocation(t,`position`);e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),this.uniformResolution=e.getUniformLocation(t,`resolution`),this.uniformTime=e.getUniformLocation(t,`time`),this.uniformMove=e.getUniformLocation(t,`move`),this.uniformTouch=e.getUniformLocation(t,`touch`),this.uniformPointerCount=e.getUniformLocation(t,`pointerCount`),this.uniformPointers=e.getUniformLocation(t,`pointers`)}render(e=0){let t=this.gl,n=this.program;!n||t.getProgramParameter(n,t.DELETE_STATUS)||(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(n),t.bindBuffer(t.ARRAY_BUFFER,this.buffer),t.uniform2f(this.uniformResolution,this.canvas.width,this.canvas.height),t.uniform1f(this.uniformTime,e*.001),t.uniform2f(this.uniformMove,this.mouseMove[0],this.mouseMove[1]),t.uniform2f(this.uniformTouch,this.mouseCoords[0],this.mouseCoords[1]),t.uniform1i(this.uniformPointerCount,this.nbrOfPointers),t.uniform2fv(this.uniformPointers,this.pointerCoords),t.drawArrays(t.TRIANGLE_STRIP,0,4))}},c=class{constructor(e,t){this.active=!1,this.pointers=new Map,this.lastCoords=[0,0],this.moves=[0,0],this.scale=t;let n=(e,t,n,r)=>{let i=e.getBoundingClientRect();return[(n-i.left)*t,e.height-(r-i.top)*t]};e.addEventListener(`pointerdown`,t=>{this.active=!0,this.pointers.set(t.pointerId,n(e,this.getScale(),t.clientX,t.clientY))});let r=e=>{this.count===1&&(this.lastCoords=this.first),this.pointers.delete(e.pointerId),this.active=this.pointers.size>0};e.addEventListener(`pointerup`,r),e.addEventListener(`pointerleave`,r),e.addEventListener(`pointermove`,t=>{this.active&&(this.lastCoords=[t.clientX,t.clientY],this.pointers.set(t.pointerId,n(e,this.getScale(),t.clientX,t.clientY)),this.moves=[this.moves[0]+t.movementX,this.moves[1]+t.movementY])})}getScale(){return this.scale}updateScale(e){this.scale=e}get count(){return this.pointers.size}get move(){return this.moves}get coords(){return this.pointers.size>0?Array.from(this.pointers.values()).flat():[0,0]}get first(){return this.pointers.values().next().value||this.lastCoords}},l=()=>{let e=(0,i.useRef)(null),t=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let r=e.current;if(!r)return;let i=Math.max(1,.5*window.devicePixelRatio);t.current=new s(r,i),n.current=new c(r,i),t.current.setup(),t.current.init();let a=()=>{r.width=window.innerWidth*i,r.height=window.innerHeight*i,t.current&&t.current.updateScale(i)};a(),window.addEventListener(`resize`,a);let o=!0,l=null,u=e=>{o&&(!t.current||!n.current||(t.current.updateMouse(n.current.first),t.current.updatePointerCount(n.current.count),t.current.updatePointerCoords(n.current.coords),t.current.updateMove(n.current.move),t.current.render(e),l=requestAnimationFrame(u)))},d=new IntersectionObserver(([e])=>{o=e.isIntersecting,o?(l&&cancelAnimationFrame(l),l=requestAnimationFrame(u)):l&&cancelAnimationFrame(l)},{threshold:.01});return d.observe(r),()=>{window.removeEventListener(`resize`,a),d.disconnect(),l&&cancelAnimationFrame(l),t.current&&t.current.reset()}},[]),e};function u(){let e=l();return(0,a.jsxs)(`div`,{className:`relative w-full h-[100svh] overflow-hidden bg-black border-t border-[var(--rule)]`,children:[(0,a.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}}),(0,a.jsx)(`canvas`,{ref:e,className:`absolute inset-0 w-full h-full object-cover touch-none z-0`,style:{background:`black`}}),(0,a.jsxs)(`div`,{className:`absolute inset-0 z-10 flex flex-col items-center justify-center text-white`,children:[(0,a.jsx)(`div`,{className:`mb-8 animate-fade-in-down`,children:(0,a.jsxs)(`div`,{className:`flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm`,children:[(0,a.jsx)(`div`,{className:`flex gap-1 text-yellow-300`,children:(0,a.jsx)(`span`,{children:`✨`})}),(0,a.jsx)(`span`,{className:`text-orange-100 font-mono text-[11px] uppercase tracking-wider`,children:`Trusted By The World`})]})}),(0,a.jsxs)(`div`,{className:`text-center space-y-6 max-w-5xl mx-auto px-4`,children:[(0,a.jsxs)(`div`,{className:`space-y-2`,children:[(0,a.jsx)(`h1`,{className:`text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200`,children:`Launch Your Product`}),(0,a.jsx)(`h1`,{className:`text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400`,children:`Into The World`})]}),(0,a.jsx)(`div`,{className:`max-w-3xl mx-auto animate-fade-in-up animation-delay-600`,children:(0,a.jsx)(`p`,{className:`text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed`,children:`Supercharge productivity with AI-powered automation and integrations built for the next generation of developer — fast, seamless, and limitless.`})}),(0,a.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800`,children:[(0,a.jsx)(r,{href:`/contact`,className:`px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 flex items-center justify-center`,children:`Let's talk`}),(0,a.jsx)(r,{href:`/work`,className:`px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center`,children:`See the work`})]})]})]})]})}export{u as default};