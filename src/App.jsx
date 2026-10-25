import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [profileView, setProfileView] = useState('intro');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (profileView !== 'intro') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let angle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#F5F1E8';
      ctx.fillRect(0, 0, width, height);

      angle += 0.006;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      const arms = 5;
      const dotsPerArm = 65;
      
      const colors = [
        'rgba(243, 201, 216, 0.80)',
        'rgba(122, 132, 81, 0.70)',
        'rgba(232, 165, 194, 0.75)',
        'rgba(220, 210, 190, 0.85)'
      ];

      for (let arm = 0; arm < arms; arm++) {
        const armAngle = (arm * 2 * Math.PI) / arms;

        for (let i = 0; i < dotsPerArm; i++) {
          const distance = i * 8.5;
          const currentAngle = armAngle + i * 0.11;

          const x = Math.cos(currentAngle) * distance;
          const y = Math.sin(currentAngle) * distance;
          const size = 3.5 + i * 0.4;

          const color = colors[i % colors.length];

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowBlur = 16;
          ctx.shadowColor = color;
          ctx.fill();
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [profileView]);

  return (
    <div className="app-main">
      {profileView === 'intro' && (
        <main className="intro-wrapper">
          {/* CANVAS FIJO Y CENTRADO EN PANTALLA COMPLETA */}
          <canvas ref={canvasRef} className="spiral-canvas"></canvas>

          <header className="header-box">
            <span className="welcome-tag">✧ BIENVENID@ A MI UNIVERSO DIGITAL ✧</span>
            <h1 className="fairy-title">Ana Sofía Ramos Granados</h1>
            <p className="fairy-subtitle">
              estudiante de 6.º Semestre en Ingeniería de Sistemas &amp; 2.º Semestre en Música (UNAB)
            </p>
            <p className="intro-description">
              Explora la convergencia entre la lógica algorítmica, el desarrollo web moderno y la sensibilidad artística.
            </p>
          </header>

          <div className="choices-grid">
            <button 
              className="choice-card engineering-card" 
              onClick={() => setProfileView('ingeniera')}
            >
              <div className="card-icon">💻</div>
              <h3>Perfil de Ingeniera</h3>
              <p>Diseño y desarrollo de aplicaciones web interactivas y soluciones móviles orientadas a la experiencia de usuario.</p>
              <span className="card-action">Explorar Código &rarr;</span>
            </button>

            <button 
              className="choice-card music-card" 
              onClick={() => setProfileView('musica')}
            >
              <div className="card-icon card-icon-mus">𝄂𝄚𝅦𝄚𝄞𝅄</div>
              <h3>Perfil de Música</h3>
              <p>Descubrimientos semanales, reels canto y guitarra eléctrica &amp; mis exploraciones sobre la música.</p>
              <span className="card-action">Escuchar &amp; Conocer &rarr;</span>
            </button>

            <button
              className="choice-card contact-choice"
              onClick={() => setProfileView('contacto')}
            >
              <div className="card-icon">✉️</div>
              <h3>Contacto</h3>
              <p>¿Tienes una idea, proyecto o simplemente quieres saludar? Me encantará leerte.</p>
              <span className="card-action">Hablemos &rarr;</span>
            </button>
          </div>
        </main>
      )}

      {/* DETALLE INGENIERÍA: Mantiene tu estructura base y amplía la información */}
      {profileView === 'ingeniera' && (
        <div className="profile-container">
          <button className="back-btn" onClick={() => setProfileView('intro')}>
            &larr; Volver a la Elección
          </button>
          <div className="profile-card">
            <span className="badge">UNAB - 6.° Semestre</span>
            <h2>Ingeniería de Sistemas (Desarrolladora Junior)</h2>
            
            <p className="profile-bio">
              Como desarrolladora <strong>Junior</strong> en constante crecimiento, me dedico al diseño y desarrollo de sitios y aplicaciones web dinámicas con diversos frameworks, así como soluciones móviles funcionales. Me defiendo eficazmente al asumir nuevos proyectos, combinando adaptabilidad, lógica de programación y un enfoque constante en la experiencia de usuario.
            </p>

            {/* Frameworks y Tecnologías */}
            <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--negro-tinta)' }}>
              Frameworks &amp; Tecnologías
            </h3>
            <div className="tags">
              <span className="tag">Desarrollo Web</span>
              <span className="tag">Desarrollo Móvil</span>
              <span className="tag">React.js</span>
              <span className="tag">Next.js</span>
              <span className="tag">Vue.js</span>
              <span className="tag">Angular (Básico)</span>
              <span className="tag">JavaScript ES6+</span>
              <span className="tag">CSS3 / Web UI</span>
              <span className="tag">Git &amp; GitHub</span>
            </div>

            <section className="cv-section">
              <div>
                <span className="cv-eyebrow">PERFIL PROFESIONAL</span>
                <h3>Mi currículum</h3>
                <p>Conoce mi formación, experiencia y habilidades en un solo documento.</p>
              </div>
              <div className="cv-actions">
                <a className="cv-button cv-view" href="/ANASOFIARAMOSGRANADOSCV.pdf" target="_blank" rel="noopener noreferrer">
                  Ver CV <span aria-hidden="true">↗</span>
                </a>
                <a className="cv-button cv-download" href="/ANASOFIARAMOSGRANADOSCV.pdf" download="ANASOFIARAMOSGRANADOSCV.pdf">
                  Descargar PDF <span aria-hidden="true">↓</span>
                </a>
              </div>
            </section>

            {/* Uso de Inteligencia Artificial */}
            <div style={{ marginTop: '1.8rem', padding: '1.2rem', background: 'rgba(122, 132, 81, 0.12)', borderRadius: '15px', border: '1px solid rgba(122, 132, 81, 0.25)' }}>
              <h4 style={{ color: 'var(--verde-oliva)', marginBottom: '0.4rem', fontSize: '0.98rem' }}>
                🤖 Uso de Inteligencia Artificial en el Desarrollo
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: '1.5' }}>
                Considero que la IA es una herramienta fundamental en el desarrollo moderno. La integro en mi flujo de trabajo como copiloto para optimizar la estructura de código, depurar errores y agilizar mi proceso de aprendizaje con nuevas tecnologías.
              </p>
            </div>

{/* Conexiones Profesionales Centradas */}
            <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid #eae5dc', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--negro-tinta)', textAlign: 'center' }}>
                Mis Redes Profesionales
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.linkedin.com/in/ana-sofia-ramos-granados-128bb2413" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    padding: '0.65rem 1.4rem', 
                    borderRadius: '12px', 
                    background: '#0077b5', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🔗 Mi LinkedIn &rarr;
                </a>
                <a 
                  href="https://github.com/ANNNAAAAAA12" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    padding: '0.65rem 1.4rem', 
                    borderRadius: '12px', 
                    background: '#24292e', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  💻 Mi GitHub &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

{profileView === 'musica' && (
        <div className="profile-container">
          <button className="back-btn" onClick={() => setProfileView('intro')}>
            &larr; Volver a la Elección
          </button>
          
          <div className="profile-card">
            <span className="badge music-badge">UNAB - 2.° Semestre</span>
            <h2>Bitácora Musical &amp; Producción Sonora</h2>
            <p className="profile-bio">
              Un recorrido por mis covers, la guitarra eléctrica, exploraciones armónicas y descubrimientos sonoros.
            </p>

            {/* BOTONES DE REELS */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.5rem 0 2rem 0' }}>
              <a 
                href="https://www.instagram.com/reel/DelAD31NQOD/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '0.7rem 1.3rem',
                  borderRadius: '15px',
                  background: 'rgba(232, 165, 194, 0.4)',
                  border: '1px solid rgba(232, 165, 194, 0.8)',
                  color: '#8B4862',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🎤 Reels Cantando &rarr;
              </a>
              <a 
                href="https://www.instagram.com/reel/DeVL1JUNo7T/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '0.7rem 1.3rem',
                  borderRadius: '15px',
                  background: 'rgba(122, 132, 81, 0.2)',
                  border: '1px solid rgba(122, 132, 81, 0.5)',
                  color: '#545C33',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🎸 Reels Guitarra Eléctrica &rarr;
              </a>
            </div>

            {/* SECCIÓN SPOTIFY & ANÁLISIS MUSICAL */}
            <h3 style={{ fontSize: '1.2rem', color: 'var(--negro-tinta)', marginBottom: '1rem', borderBottom: '2px solid #F3C9D8', paddingBottom: '0.4rem' }}>
              🎧 Descubrimientos &amp; Análisis Sonoro
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* CANCIÓN 1 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026ebd5e789646a833b8f7d4ba" alt="Portada de Don't Speak, No Doubt" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>1. Don't Speak — No Doubt</strong>
                  <a href="https://open.spotify.com/track/6urCAbunOQI4bLhmGpX7iS?si=1kGB_xT3TYuHTyykORtr-A" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Mi canción favorita:</strong> Gwen Stefani escribió esta canción tras la ruptura de su relación de 7 años con Tony Kanal, el mismísimo baterista de la banda. El dolor de ensayar y cantar frente a él dio vida a este ícono noventero.
                </p>
              </div>

              {/* CANCIÓN 2 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c428f67b4a9b7e1114dfc117" alt="Portada de Washing Machine Heart, Mitski" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>2. Washing Machine Heart — Mitski</strong>
                  <a href="https://open.spotify.com/track/3jjsRKEsF42ccXf8kWR3nu?si=MAoAQiI0SAKmCCTF-RzfLg" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Sensación disonante &amp; extraña:</strong> La tensión de la canción proviene de la yuxtaposición entre un ritmo synth-pop constante y los intervalos disonantes en la voz que generan esa ligera incomodidad fascinante.
                </p>
              </div>

              {/* CANCIÓN 3 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02dc30583ba717007b00cceb25" alt="Portada de Because, The Beatles" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>3. Because — The Beatles</strong>
                  <a href="https://open.spotify.com/track/1rxoyGj1QuPoVi8fOft1Kt?si=_aoHxVDjS-yzDO8c5Mwb0g" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Efecto angelical &amp; orquestación vocal:</strong> Grabaron las voces de John, Paul y George triplicadas en estudio para sonar como 9 voces unísonas sobre una progresión basada al revés en la 'Claro de Luna' de Beethoven.
                </p>
              </div>

              {/* CANCIÓN 4 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b3d0bf02a5fb2f676c748432" alt="Portada de Labyrinth, Miracle Musical" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>4. Labyrinth — Miracle Musical</strong>
                  <a href="https://open.spotify.com/track/0L7MpEwFgZRP5rFdXOYaRT?si=_VvCZqrFSvqQklxjgXPUTg" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Energía pura &amp; síntesis:</strong> Destaca por la transición entre arpegios de piano clásico y líneas de sintetizador retro inspiradas en música de videojuegos de 8-bits.
                </p>
              </div>

              {/* CANCIÓN 5 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f50610925dccd6802ceadac5" alt="Portada de El Problema, Ricardo Arjona" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>5. El Problema — Ricardo Arjona</strong>
                  <a href="https://open.spotify.com/track/4xOH4JowajfqHegIJ07EJV?si=Li2HWh01QDW-deW3f2X9Wg" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Narrativa sobre la condición humana:</strong> Analiza la psicología de desear lo inalcanzable y perder el interés cuando las cosas se vuelven demasiado sencillas.
                </p>
              </div>

              {/* CANCIÓN 6 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://i.scdn.co/image/ab67616d0000b273143c72a64d265868dcc0dbc6" alt="Portada de Don, Miranda!" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>6. Don — Miranda!</strong>
                  <a href="https://open.spotify.com/track/0WajUW5XINeraP2w0F3F8E" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Estructura Pop &amp; Intros intrigantes:</strong> Famosa por la incorporación dramática del solo de guitarra ('es la guitarra de Lolo') integrada sobre bases de electro-pop bailable.
                </p>
              </div>

              {/* CANCIONES 7 A 10 */}
              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02653b110d9560eb1656f4c583" alt="Portada de Shape Of My Heart, Sting" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>7. Shape Of My Heart — Sting</strong>
                  <a href="https://open.spotify.com/track/6CKoWCWAqEVWVjpeoJXyNH?si=nVtkSuz9RlSpxhuR8DJxDA" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Amor por el Rock &amp; Esencia noventera:</strong> Me encanta la música de esta época. Dominic Miller escribió el memorable riff de guitarra acústica en clave de Fa sostenido menor, creando un arpegio melancólico inolvidable sobre el cual Sting construyó la poética metáfora del jugador de cartas.
                </p>
              </div>

              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c94e14d2c3f9a0219f7605c6" alt="Portada de Cuento, Ximena Sariñana" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>8. Cuento — Ximena Sariñana</strong>
                  <a href="https://open.spotify.com/track/6KH5I74Q8OccGi5KLaxfDD?si=FZvPTvxpSRWGjorc94wM-g" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Texturas Vocales &amp; Melancolía:</strong> Destaca por su producción minimalista donde la interpretación vocal limpia y suave se combina con sutiles matices acústicos, capturando la nostalgia melódica característica del pop/rock alternativo en español.
                </p>
              </div>

              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02fb2faa3ed46d1d0124ca325e" alt="Portada de (I Just) Died In Your Arms, Cutting Crew" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>9. (I Just) Died In Your Arms — Cutting Crew</strong>
                  <a href="https://open.spotify.com/track/4ByEFOBuLXpCqvO1kw8Wdm?si=TaWxbU3VS3mV8ISojEnwOA" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Energía Pop/Rock de los 80s:</strong> Escrita por Nick Van Eede, el icónico motivo de guitarra inicial y el uso potente de sintetizadores sintetizan a la perfección la energía dramática y la estética del rock ochentero.
                </p>
              </div>

              <div className="song-card" style={{ padding: '1rem', borderRadius: '15px', background: '#FDFBF7', border: '1px solid #EAE6DF' }}>
                <img className="song-cover" src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e44963b8bb127552ac761873" alt="Portada de November Rain, Guns N' Roses" loading="lazy" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <strong style={{ color: '#8B4862' }}>10. November Rain — Guns N' Roses</strong>
                  <a href="https://open.spotify.com/track/3YRCqOhFifThpSRFJ1VWFM?si=22EXnM8oSwm2n7sH8o-U_g" target="_blank" rel="noopener noreferrer" style={{ color: '#1DB954', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ▶ Escuchar en Spotify
                  </a>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '0.4rem' }}>
                  <strong>Guitarra Favorita:</strong> Contiene <strong>mi solo favorito de guitarra</strong>. La manera en que Slash construye la tensión melódica hasta el explosivo clímax armónico es una obra maestra de lirismo y técnica en la guitarra eléctrica.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {profileView === 'contacto' && (
        <main className="profile-container contact-container">
          <button className="back-btn" onClick={() => setProfileView('intro')}>
            &larr; Volver al inicio
          </button>

          <section className="contact-panel">
            <div className="contact-heading">
              <span className="contact-eyebrow">✦ ABIERTA A NUEVAS IDEAS ✦</span>
              <h2>Hagamos algo increíble.</h2>
              <p>Una conversación puede ser el comienzo de algo genial. Elige por dónde quieres escribirme.</p>
            </div>

            <div className="contact-grid">
              <a className="contact-link contact-whatsapp" href="https://wa.me/573005296280?s=p" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon" aria-hidden="true">☏</span>
                <span className="contact-copy">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">+57 300 529 6280</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>

              <a className="contact-link contact-email" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=annasoframosgrann%40gmail.com&amp;su=Hola%2C%20vi%20tu%20portafolio&amp;body=Hola%2C%20vi%20tu%20portafolio%20y%20me%20interesar%C3%ADa..." target="_blank" rel="noopener noreferrer">
                <span className="contact-icon" aria-hidden="true">＠</span>
                <span className="contact-copy">
                  <span className="contact-label">Correo electrónico</span>
                  <span className="contact-value">annasoframosgrann@gmail.com</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>

              <a className="contact-link contact-phone" href="tel:+573005296280">
                <span className="contact-icon" aria-hidden="true">⌕</span>
                <span className="contact-copy">
                  <span className="contact-label">Una llamada</span>
                  <span className="contact-value">+57 300 529 6280</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>

              <a className="contact-link contact-instagram" href="https://www.instagram.com/anna.151220?dlrf=MWcwaG40cmlmdmh0dw%3D%3D&amp;utm_source=qr" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon" aria-hidden="true">◎</span>
                <span className="contact-copy">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@anna.151220</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="contact-signoff">Con música, código y buenas ideas. <span>✷</span></p>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;