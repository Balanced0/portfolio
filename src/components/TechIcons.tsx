import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Html5Icon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" />
      <path fill="#EF652A" d="M12 2.18v19.607l6.844-1.948L20.367 2.18H12z" />
      <path fill="#ECECEC" d="M12 8.358H8.195l-.265-2.986H12V2.417H5.03l.812 9.113h6.158v-3.172zM12 17.514l-.014.004-3.568-.963-.228-2.556H5.215l.448 5.033 6.323 1.756.014-.004v-3.27z" />
      <path fill="#FFFFFF" d="M12 8.358v3.172h3.641l-.344 3.869-3.297.89v3.27l6.325-1.754.04-.447.747-8.375.077-.825H12zM12 2.417v2.955h6.691l.076-.826.19-2.129H12z" />
    </svg>
  );
}

export function Css3Icon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0z" />
      <path fill="#33A9DC" d="M12 2.18v19.607l6.844-1.948L20.367 2.18H12z" />
      <path fill="#ECECEC" d="M12 8.358H5.56l.265 2.986H12V8.358zm0-5.941H5.03l.265 2.986H12V2.417zm0 15.097l-.014.004-3.568-.963-.228-2.556H5.215l.448 5.033 6.323 1.756.014-.004v-3.27z" />
      <path fill="#FFFFFF" d="M12 8.358v2.986h3.376l-.28 3.143-3.096.837v3.27l6.324-1.754.04-.447.67-7.51h.077-.825H12zm0-5.941v2.986h6.691l.076-.826.19-2.16H12z" />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        fill="#000000"
        d="M6.924 18.736c.924.542 2.072.88 3.125.88 1.95 0 3.037-.94 3.037-2.617 0-1.464-.816-2.18-2.454-2.885l-.752-.325c-1.026-.434-1.478-.853-1.478-1.639 0-.825.69-1.436 1.777-1.436.963 0 1.683.337 2.21.688l.687-1.705c-.687-.433-1.752-.771-2.922-.771-2.022 0-3.324 1.13-3.324 2.76 0 1.54 1.002 2.26 2.505 2.884l.752.325c1.127.482 1.554.915 1.554 1.758 0 .939-.827 1.589-2.129 1.589-1.178 0-2.096-.457-2.735-.915l-.853 1.503zm8.384.288c.95 0 1.716-.277 2.228-.602l-.565-1.504c-.39.229-.854.409-1.428.409-.841 0-1.397-.505-1.397-1.72v-4.14h2.24V9.87h-2.24V6.992h-1.895v2.877h-1.323v1.59h1.323v4.357c0 2.37 1.299 3.208 3.057 3.208z"
      />
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        fill="#FFFFFF"
        d="M1.5 1.5h21v21h-21z"
        opacity="0"
      />
      <path
        fill="#FFFFFF"
        d="M11.96 17.59c.79.43 1.72.69 2.6.69 1.58 0 2.45-.72 2.45-1.99 0-1.12-.66-1.67-1.99-2.21l-.61-.25c-.83-.34-1.2-.67-1.2-1.28 0-.64.55-1.11 1.44-1.11.78 0 1.36.26 1.79.53l.56-1.35c-.56-.35-1.42-.61-2.37-.61-1.64 0-2.7.88-2.7 2.14 0 1.18.81 1.75 2.03 2.23l.61.25c.91.39 1.26.73 1.26 1.37 0 .76-.67 1.24-1.73 1.24-.96 0-1.7-.37-2.21-.74l-.62 1.29zm-5.74-.27h1.94v-5.92h2.21V10.1H4.01v1.3h2.21v5.92z"
      />
    </svg>
  );
}

export function CPlusPlusIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#00599C"
        d="M12 1.5L2.5 7v10L12 22.5 21.5 17V7L12 1.5z"
      />
      <path
        fill="#FFFFFF"
        d="M9.8 14.7a3.5 3.5 0 1 1 0-5.4l1.1.9a2.1 2.1 0 1 0 0 3.6l-1.1.9zm4.2-3.2h1.1V10h.9v1.5H17v.9h-1v1.5h-.9v-1.5h-1.1v-.9zm3.8 0h1.1V10h.9v1.5H21v.9h-1v1.5h-.9v-1.5h-1.1v-.9z"
      />
    </svg>
  );
}

export function PythonIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#3776AB"
        d="M11.898 1.444c-5.116 0-4.8 2.218-4.8 2.218v2.3H12.2v.689H4.403s-2.903.328-2.903 4.908c0 4.579 2.532 4.743 2.532 4.743h1.51v-2.138s-.081-2.532 2.493-2.532h4.179s2.412.04 2.412-2.332V3.791s.367-2.347-4.728-2.347zm-2.61 1.488a.808.808 0 1 1 0 1.616.808.808 0 0 1 0-1.616z"
      />
      <path
        fill="#FFD43B"
        d="M12.102 22.556c5.116 0 4.8-2.218 4.8-2.218v-2.3H11.8v-.689h7.797s2.903-.328 2.903-4.908c0-4.579-2.532-4.743-2.532-4.743h-1.51v2.138s.081 2.532-2.493 2.532h-4.179s-2.412-.04-2.412 2.332v4.498s-.367 2.347 4.728 2.347zm2.61-1.488a.808.808 0 1 1 0-1.616.808.808 0 0 1 0 1.616z"
      />
    </svg>
  );
}

export function JavaIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#5382A1"
        d="M8.85 18.52s-1.28.18-1.8.44c-1.32.65.62 1.34 2.05.95 1.7-.47 4.41-.83 6.03.11 0 0 .54-.36.87-.54-2.02-1.32-5.46-1.3-7.15-.96zm-1.12-2.8s-1.33.24-1.85.57c-1.32.83.6 1.48 2.14.99 2.04-.64 5.37-1.02 7.03.22 0 0 .44-.41.67-.62-2.39-1.59-6.22-1.59-7.99-1.16zm9.36 4.67c-3.15 1.25-9.35 1.28-11.86.06-.5-.24-1.23-.7.96-.92 2.76-.28 5.7-.22 8.35.15 1.55.22 3.12.44 2.55.71z"
      />
      <path
        fill="#E76F00"
        d="M13.2 2.51c1.23 1.32.74 3.32-.4 4.54-1.4 1.5-2.73 2.94-2.58 5.09.21.36.48.7.8.97.35-.41.74-.82.97-1.33.56-1.22.42-2.61.16-3.92-.3-1.55-.49-3.23.1-4.71.32-.23.63-.44.95-.64z"
      />
      <path
        fill="#5382A1"
        d="M17.16 11.23c.85-.92.83-2.14.54-3.23-.1-.38-.26-.74-.47-1.07-.36.75-.48 1.63-.33 2.45.1.57.34 1.13.26 1.85z"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  );
}

export function NextjsIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#000000" stroke="#333333" strokeWidth="1" />
      <path
        fill="url(#nextjs-grad)"
        d="M14.782 16.326L9.627 9.538V16.5H8V7.5h1.905l5.244 6.942V7.5h1.633v8.826h-2.000z"
      />
      <path fill="#FFFFFF" d="M16 7.5h1.633v4.5H16z" />
      <defs>
        <linearGradient id="nextjs-grad" x1="12" y1="7.5" x2="12" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#A1A1AA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NodejsIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#339933"
        d="M12 1.8l9.5 5.5v11L12 23.8 2.5 18.3v-11L12 1.8zm-1.8 13.7v-4.1l-3.2 1.8v2.3l3.2 2zm3.6 0l3.2-2v-2.3l-3.2-1.8v4.1zm1.8-6.9L12 6.6 8.4 8.6l3.6 2.1 3.6-2.1z"
      />
    </svg>
  );
}

export function ExpressIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#111111" />
      <text
        x="12"
        y="16"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        ex
      </text>
    </svg>
  );
}

export function DjangoIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#092E20" />
      <path
        fill="#44B78B"
        d="M11.6 6h2.1v9.6c0 2-.9 2.9-2.7 2.9-.6 0-1.3-.1-1.8-.3l.3-1.7c.4.1.8.2 1.1.2.9 0 1.3-.4 1.3-1.3V6zm-4.3 4.1c.9 0 1.6.3 2 1v-1h2.1v8.4H9.3v-1c-.4.7-1.2 1.1-2.1 1.1-1.7 0-2.8-1.3-2.8-4.2.1-2.9 1.2-4.3 2.9-4.3zm.5 6.7c.9 0 1.5-.7 1.5-2.5 0-1.7-.6-2.5-1.5-2.5-.9 0-1.5.8-1.5 2.5 0 1.8.6 2.5 1.5 2.5z"
      />
    </svg>
  );
}

export function TailwindIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#38BDF8"
        d="M12 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.6 1 2.4 1.8 1.2 1.2 2.6 2.6 5.4 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.6-1-2.4-1.8-1.2-1.2-2.6-2.6-5.4-2.6zm-6 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.6 1 2.4 1.8 1.2 1.2 2.6 2.6 5.4 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.6-1-2.4-1.8-1.2-1.2-2.6-2.6-5.4-2.6z"
      />
    </svg>
  );
}

export function ThreejsIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 0v20M3 7l9 5 9-5M3 17l9-5 9 5"
      />
    </svg>
  );
}

export function FramerMotionIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path fill="#0055FF" d="M4 0h16v8h-8z" />
      <path fill="#0099FF" d="M4 8h8l8 8H4z" />
      <path fill="#F08" d="M4 16h8v8z" />
    </svg>
  );
}

export function MongodbIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#47A248"
        d="M11.517 23.864c-.206-.076-4.664-1.954-6.386-7.391-1.396-4.418-.281-9.088 3.325-13.911.83-1.11 1.761-2.07 2.164-2.463l.38-.372.38.372c.403.393 1.334 1.353 2.164 2.463 3.606 4.823 4.721 9.493 3.325 13.911-1.722 5.437-6.18 7.315-6.386 7.391l-.483.136-.483-.136z"
      />
      <path
        fill="#499D4A"
        d="M12 23.864V.127c.403.393 1.334 1.353 2.164 2.463 3.606 4.823 4.721 9.493 3.325 13.911-1.722 5.437-6.18 7.315-6.386 7.391L12 23.864z"
      />
    </svg>
  );
}

export function PostgresIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#4169E1"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.3 14.7c-.5.3-1.2.5-2 .5-1.8 0-3.3-1.2-3.8-2.9h-1v-1.5h1.2c.1-.5.3-1 .6-1.4l-.8-.8 1.1-1.1.8.8c.4-.3.9-.5 1.4-.6V8.5h1.5v1.2c.5.1 1 .3 1.4.6l.8-.8 1.1 1.1-.8.8c.3.4.5.9.6 1.4h1.2v1.5h-1.2c-.5 1.7-2 2.9-3.8 2.9z"
      />
    </svg>
  );
}

export function MysqlIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#00618A"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 13.5c-1.5 1-3.5 1.2-5.2.5l-.8 1.5C7.2 16.5 5 15 5 13.2V8.5h2v4c0 .8 1 1.5 2 1.5s2-.7 2-1.5v-4h2v4.7c0 1.2.8 2 1.8 2.3l.7-2h2l-2 4.5z"
      />
    </svg>
  );
}

export function RedisIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path fill="#DC382D" d="M2 17.5l10 4.5 10-4.5v-3L12 19 2 14.5v3z" />
      <path fill="#D82C23" d="M2 11.5l10 4.5 10-4.5v-3L12 13 2 8.5v3z" />
      <path fill="#F0493E" d="M12 2L2 6.5l10 4.5 10-4.5L12 2z" />
    </svg>
  );
}

export function GitIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#F05032"
        d="M21.6 10.9L13.1 2.4c-.6-.6-1.6-.6-2.2 0L8.7 4.6l2.8 2.8c.6-.2 1.3.1 1.6.7.4.6.3 1.4-.2 1.9l2.7 2.7c.5-.4 1.3-.5 1.9-.2.7.4.9 1.2.7 1.9L20.4 12c.7-.3 1.4.1 1.7.7.4.6.2 1.5-.5 1.9l-2.2 2.2c-.6.6-1.6.6-2.2 0l-8.5-8.5c-.6-.6-.6-1.6 0-2.2l2.2-2.2L6.3 1.6c-.6-.6-1.6-.6-2.2 0L1.7 4c-.6.6-.6 1.6 0 2.2l8.5 8.5c.6.6 1.6.6 2.2 0l2.2-2.2 2.8 2.8c-.2.6.1 1.3.7 1.6.6.4 1.4.3 1.9-.2l2.7 2.7c-.4.5-.5 1.3-.2 1.9.4.7 1.2.9 1.9.7l.2.2c.6.6 1.6.6 2.2 0l2.4-2.4c.7-.6.7-1.6.1-2.2z"
      />
    </svg>
  );
}

export function GithubTechIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PostmanIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF6C37" />
      <path
        fill="#FFFFFF"
        d="M15.5 8.5l-7 3.5 3.5 1.5 1.5 3.5 2-8.5z"
      />
    </svg>
  );
}

export function VercelIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L24 22H0L12 1Z" fill="#FFFFFF" />
    </svg>
  );
}

export function DockerIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        fill="#2496ED"
        d="M13.983 11.078h2.119v2.02h-2.119zm-3.054 0h2.118v2.02h-2.118zm-3.054 0h2.118v2.02H7.875zm-3.054 0h2.118v2.02H4.821zm9.162-3.018h2.119v2.02h-2.119zm-3.054 0h2.118v2.02h-2.118zm-3.054 0h2.118v2.02H7.875zm6.108-3.018h2.119v2.02h-2.119zM1.084 14.187c.189.62.531 1.18.995 1.636 1.76 1.728 5.093 2.177 8.086 2.177 4.708 0 8.682-1.282 10.375-3.829h.448c.683 0 1.348-.198 1.914-.567-.478-.328-1.047-.514-1.642-.514h-.724c-.457-1.393-1.637-2.47-3.08-2.793v.004H1.084v3.886z"
      />
    </svg>
  );
}

export function AwsIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#232F3E" />
      <path
        fill="#FF9900"
        d="M6.8 14.2c-.8 0-1.4-.2-1.9-.6l.5-1.1c.4.3.9.5 1.4.5.6 0 1-.3 1-.7v-.1c-.2.2-.6.4-1.1.4-1 0-1.7-.6-1.7-1.5 0-1.1.8-1.7 2.1-1.7h.7V9c0-.6-.4-.9-1.1-.9-.5 0-1 .2-1.4.4l-.4-1c.5-.3 1.2-.5 2-.5 1.4 0 2.2.7 2.2 2.1v3.2c0 .7.1 1.2.3 1.5h-1.3c-.2-.2-.3-.5-.3-.9zm.2-3.1h-.6c-.6 0-1 .2-1 .7 0 .4.3.7.8.7.6 0 1-.4 1-.9v-.5zm4.8 3.1l-1.3-4.8h1.4l.7 3.2.8-3.2h1.2l.8 3.2.7-3.2h1.4l-1.3 4.8h-1.3l-.8-3.1-.8 3.1h-1.3zm7-1.1c.4.3.9.5 1.5.5.6 0 1-.3 1-.7 0-1.1-2.4-.6-2.4-2.2 0-.9.8-1.5 2.1-1.5.6 0 1.2.2 1.6.4l-.4 1c-.4-.2-.8-.4-1.2-.4-.6 0-.9.3-.9.6 0 1.1 2.4.6 2.4 2.2 0 1-.8 1.6-2.2 1.6-.7 0-1.4-.2-1.9-.5l.5-1z"
      />
      <path
        fill="#FF9900"
        d="M5 16.5c3.5 2 10.5 2 14-1"
        stroke="#FF9900"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RestApiIcon({ className = "w-6 h-6", style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="3" fill="#8B5CF6" />
      <circle cx="18" cy="6" r="3" fill="#EC4899" />
      <circle cx="18" cy="18" r="3" fill="#06B6D4" />
      <path d="M8.5 10.8L15.5 7.2M8.5 13.2L15.5 16.8" stroke="#A78BFA" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Master Tech Icon Resolver
 * Matches icon string or skill name to an authentic brand SVG icon.
 */
export function getTechIcon(name: string, iconName?: string, className = "w-6 h-6") {
  const query = `${name} ${iconName || ''}`.toLowerCase();

  if (query.includes('html')) return <Html5Icon className={className} />;
  if (query.includes('css') && !query.includes('tailwind')) return <Css3Icon className={className} />;
  if (query.includes('typescript') || query.includes('ts')) return <TypeScriptIcon className={className} />;
  if (query.includes('javascript') || query.includes('js')) return <JavaScriptIcon className={className} />;
  if (query.includes('c++') || query.includes('cpp')) return <CPlusPlusIcon className={className} />;
  if (query.includes('python')) return <PythonIcon className={className} />;
  if (query.includes('java') && !query.includes('script')) return <JavaIcon className={className} />;
  if (query.includes('react')) return <ReactIcon className={className} />;
  if (query.includes('next')) return <NextjsIcon className={className} />;
  if (query.includes('node')) return <NodejsIcon className={className} />;
  if (query.includes('express')) return <ExpressIcon className={className} />;
  if (query.includes('django')) return <DjangoIcon className={className} />;
  if (query.includes('tailwind')) return <TailwindIcon className={className} />;
  if (query.includes('three') || query.includes('webgl')) return <ThreejsIcon className={className} />;
  if (query.includes('framer') || query.includes('gsap') || query.includes('motion')) return <FramerMotionIcon className={className} />;
  if (query.includes('mongo')) return <MongodbIcon className={className} />;
  if (query.includes('postgres') || query.includes('sql') && !query.includes('my')) return <PostgresIcon className={className} />;
  if (query.includes('mysql')) return <MysqlIcon className={className} />;
  if (query.includes('redis')) return <RedisIcon className={className} />;
  if (query.includes('git') && !query.includes('hub')) return <GitIcon className={className} />;
  if (query.includes('github')) return <GithubTechIcon className={className} />;
  if (query.includes('postman')) return <PostmanIcon className={className} />;
  if (query.includes('vercel')) return <VercelIcon className={className} />;
  if (query.includes('docker')) return <DockerIcon className={className} />;
  if (query.includes('aws') || query.includes('cloud')) return <AwsIcon className={className} />;
  if (query.includes('api') || query.includes('graphql') || query.includes('rest')) return <RestApiIcon className={className} />;

  // Default fallback
  return <RestApiIcon className={className} />;
}
