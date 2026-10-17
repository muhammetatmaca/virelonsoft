import React, { useEffect, useRef } from "react";

interface TransparentCloudCanvasProps {
  className?: string;
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = vec2((a_position.x + 1.0) * 0.5, 1.0 - (a_position.y + 1.0) * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision mediump float;
uniform sampler2D u_video;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_video, v_uv);
  
  // In cloud_low.mp4, background is pure white [1.0, 1.0, 1.0].
  // Cloud density is how much it deviates from white.
  float cloudDensity = 1.0 - ((color.r + color.g + color.b) / 3.0);
  
  // Smooth alpha threshold: corners and background have exactly 0 alpha
  float alpha = smoothstep(0.015, 0.42, cloudDensity);
  
  // Sleek monochrome charcoal smoke (replaces orange/peach tone)
  vec3 smokeColor = mix(vec3(0.24, 0.24, 0.26), vec3(0.08, 0.08, 0.09), cloudDensity * 2.2);
  
  gl_FragColor = vec4(smokeColor, alpha * 0.72);
}
`;

export const TransparentCloudCanvas: React.FC<TransparentCloudCanvasProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/videos/cloud_low.mp4";
    video.crossOrigin = "anonymous";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {
      // Autoplay fallback
    });
    videoRef.current = video;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true }) ||
      (canvas.getContext("experimental-webgl", {
        alpha: true,
        premultipliedAlpha: false,
      }) as WebGLRenderingContext | null);

    if (!gl) {
      return;
    }

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let animationFrameId: number;
    let isDisposed = false;
    let isIntersecting = true;
    let lastUploadedTime = -1;

    const render = () => {
      if (isDisposed) return;

      if (!isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 1100;
          canvas.height = video.videoHeight || 600;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        if (video.currentTime !== lastUploadedTime) {
          lastUploadedTime = video.currentTime;
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);

          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting = !!(entry && entry.isIntersecting && !document.hidden);
      }, { rootMargin: "100px" });
      observer.observe(canvas);
    }

    const onVisibility = () => {
      isIntersecting = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    render();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
};

export default TransparentCloudCanvas;
