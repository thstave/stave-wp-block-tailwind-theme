// --- techIcons.js ---

import {
    ReactIcon,
    VueIcon,
    NodejsIcon,
    TailwindCSSIcon,
    WordPressIcon,
    PHPIcon,
    PythonIcon,
    JavaScriptIcon,
    CSSIcon,
    SCSSIcon,
    PostgreSQLIcon,
    MySQLIcon,
    MSSQLIcon,
    JavaIcon,
    SpringIcon,
    AngularIcon,
    CouchDBIcon,
    PouchDBIcon,
    RedisIcon,
    MongoDBIcon,
    CIcon,
    CppIcon,
    JqueryIcon,
    HibernateIcon,
    CSharpIcon,
    DotCMSIcon,
    BootstrapIcon,
    GWTIcon,
  } from "./icons"; // <-- adjust if needed
  
  export const techIconsArray = [
    { name: "React", Icon: ReactIcon },
    { name: "Vue", Icon: VueIcon },
    { name: "Node.js", Icon: NodejsIcon },
    // { name: "TailwindCSS", Icon: TailwindCSSIcon },
    { name: "WordPress", Icon: WordPressIcon },
    { name: "PHP", Icon: PHPIcon },
    { name: "Python", Icon: PythonIcon },
    { name: "JavaScript", Icon: JavaScriptIcon },
    { name: "CSS", Icon: CSSIcon },
    { name: "SCSS", Icon: SCSSIcon },
    { name: "PostgreSQL", Icon: PostgreSQLIcon },
    { name: "MySQL", Icon: MySQLIcon },
    { name: "MSSQL", Icon: MSSQLIcon },
    { name: "JAVA", Icon: JavaIcon },
    { name: "SPRING", Icon: SpringIcon },
    { name: "Angular", Icon: AngularIcon },
    { name: "CouchDB", Icon: CouchDBIcon },
    { name: "PouchDB", Icon: PouchDBIcon },
    { name: "Redis", Icon: RedisIcon },
    { name: "MongoDB", Icon: MongoDBIcon },
    { name: "C", Icon: CIcon },
    { name: "C++", Icon: CppIcon },
    { name: "Jquery", Icon: JqueryIcon },
    { name: "Hibernate", Icon: HibernateIcon },
    { name: "C#", Icon: CSharpIcon },
    { name: "DotCMS", Icon: DotCMSIcon },
    { name: "Bootstrap", Icon: BootstrapIcon },
    { name: "GWT", Icon: GWTIcon },
  ];
  
  export function getTechIconsArray() {
    return techIconsArray;
  }
  
  export function generateGridPositions({
    rows = 3,
    columns = 6,
    iconSize = 80,
    padding = 10,
    totalIcons = 18,
  } = {}) {
    const positions = [];
    const fullRows = Math.floor(totalIcons / columns);
    const remainingIcons = totalIcons % columns;
  
    for (let r = 0; r < rows; r++) {
      if (r < fullRows) {
        for (let c = 0; c < columns; c++) {
          positions.push({
            top: r * (iconSize + padding),
            left: c * (iconSize + padding),
          });
        }
      } else if (r === fullRows && remainingIcons > 0) {
        const emptySlots = columns - remainingIcons;
        const startOffset = (emptySlots * (iconSize + padding)) / 2;
        for (let c = 0; c < remainingIcons; c++) {
          positions.push({
            top: r * (iconSize + padding),
            left: startOffset + c * (iconSize + padding),
          });
        }
      }
    }
  
    // Shuffle for more natural layout
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
  
    return positions;
  }
  
  export function getRandomDelay(index) {
    // Add small randomness to each icon's animation
    return 100 + Math.floor(Math.random() * 300) + index * 50;
  }
  