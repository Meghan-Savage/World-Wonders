uniform sampler2D globeTexture;
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 0.7) * pow(intensity, 1.5);

    vec4 textureColor = texture2D(globeTexture, vertexUV);
    vec3 finalColor = atmosphere + textureColor.xyz;

    gl_FragColor = vec4(finalColor, 1.0);
}
