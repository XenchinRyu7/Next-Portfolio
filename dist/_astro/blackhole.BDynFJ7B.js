import{o as e,t}from"./react.BHk431b0.js";import{t as n}from"./jsx-runtime.DtQc8_p0.js";var r=e(t()),i=n(),a=`
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
  }
`,o=`
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;

  float tanh_approx(float x) {
    x = clamp(x, -3.0, 3.0);
    float x2 = x * x;
    return x * (27.0 + x2) / (27.0 + 9.0 * x2);
  }

  varying vec2 vTexCoord;

  void main() {
    vec2 uv = vTexCoord * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    const int MAX_STEPS = 20;
    const int NOISE_ITER = 7;
    const float INITIAL_OFFSET = 0.1;
    const float RADIAL_SCALE = 5.0;
    const float DEPTH_ATTEN = 0.2;

    float rayDepth = 0.0;
    vec4 finalColor = vec4(0.0);
    vec3 rayDir = normalize(vec3(uv, 1.0));

    for (int step = 0; step < MAX_STEPS; step++) {
      vec3 pos = rayDepth * rayDir + INITIAL_OFFSET;
      float angle = atan(pos.y / 0.2, pos.x) * 2.0;
      float radius = length(pos.xy) - RADIAL_SCALE - rayDepth * DEPTH_ATTEN;
      float height = pos.z / 3.0;
      pos = vec3(angle, height, radius);

      for (int i = 1; i <= NOISE_ITER; i++) {
        float s = float(i);
        vec3 inp = pos.yzx * s + iTime + 0.3 * float(step);
        pos += sin(inp) / s;
      }

      vec3 pattern = 0.4 * cos(pos) - 0.4;
      float dist = length(vec4(pattern, pos.z));
      rayDepth += dist;

      float phase = pos.x + float(step) * 0.4 + rayDepth;
      vec4 cp = vec4(6.0, 1.0, 9.0, 0.0);
      finalColor += (1.0 + cos(phase + cp)) / dist;
    }

    vec4 col = finalColor * finalColor / 400.0;
    col.r = tanh_approx(col.r);
    col.g = tanh_approx(col.g);
    col.b = tanh_approx(col.b);
    col.a = 1.0;
    gl_FragColor = col;
  }
`;function s({width:e,height:t,speed:n=1,mouseEnable:s=!0,timeOffset:c=0,className:l=``}){let u=(0,r.useRef)(null),d=(0,r.useRef)(null),f=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let r=document.createElement(`script`);r.src=`https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js`,r.async=!0,document.body.appendChild(r),f.current=r;let i=null;return r.onload=()=>{d.current=new window.p5(r=>{let l,d;r.setup=()=>{let n=e??(u.current?u.current.clientWidth:window.innerWidth),s=t??(u.current?u.current.clientHeight:window.innerHeight);r.createCanvas(n,s).parent(u.current),r.pixelDensity(1),r.noStroke(),d=r.createGraphics(n,s,r.WEBGL),l=d.createShader(a,o),u.current&&(i=new IntersectionObserver(([e])=>{e.isIntersecting?r.loop():r.noLoop()},{threshold:.01}),i.observe(u.current))},r.draw=()=>{d.shader(l);let e=r.millis()/1e3*n+c,t=[r.width,r.height],i=0,a=0;s&&(i=(r.mouseX/r.width*2-1)*(r.width/r.height),a=(1-r.mouseY/r.height)*2-1),l.setUniform(`iResolution`,t),l.setUniform(`iTime`,e),l.setUniform(`iMouse`,[i,a]),d.rect(0,0,r.width,r.height),r.image(d,0,0)},r.windowResized=()=>{if(!u.current)return;let e=u.current.clientWidth,t=u.current.clientHeight;r.resizeCanvas(e,t),d.resizeCanvas(e,t),l.setUniform(`iResolution`,[e,t])}})},()=>{i&&i.disconnect(),d.current&&d.current.remove(),f.current&&document.body.contains(f.current)&&document.body.removeChild(f.current)}},[e,t,n,s,c]),(0,i.jsx)(`div`,{ref:u,className:l,role:`img`,"aria-label":`Dynamic generative shader background`})}export{s as default};