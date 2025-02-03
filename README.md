# 3D Shirt Try-On
![3D Shirt Try-On Screenshot](/client/public/readme-img.png)

**Overview**

The 3D Shirt Try-On is an interactive web application that allows users to dynamically generate and customize 3D shirts with colors, logos, textures, and AI-generated designs. This project leverages cutting-edge web technologies to deliver a seamless, immersive experience.

 **Features**

- ✅ **3D Swag Generation** - Create unique 3D shirt designs dynamically.
- ✅ **Color Customization** - Apply custom colors to personalize the 3D shirts.
- ✅ **Logo Upload** - Upload custom logos and seamlessly integrate them onto the shirts.
- ✅ **Texture Image Upload** - Style the 3D shirt with custom texture images.
- ✅ **AI-Generated Logo Integration** - Leverage AI to generate and apply logos.
- ✅ **AI-Generated Textures** - Enhance designs with AI-generated textures.
- ✅ **Download Options** - Save the customized 3D shirt designs.
- ✅ **Theme Change with Color Selection** - Dynamic theme adaptation based on selected colors.
- ✅ **Responsive 3D Application** - Fully responsive for various screen sizes.
- ✅ **Framer Motion Animation** - Smooth transitions between 3D models.
- ✅ **Optimized Code Architecture** - Modular and reusable components.

🛠️ **Tech Stack & Rationale**

- **React.js** - For building a dynamic, interactive UI.
- **Three.js** - To render high-quality, animated 3D graphics.
- **React Three Fiber** - Simplifies Three.js integration with React.
- **React Three Drei** - Provides useful utilities to enhance 3D scenes.
- **Vite** - Ensures fast builds and optimized development experience.
- **Tailwind CSS** - For efficient styling and responsive design.
- **Node.js** - Backend runtime for handling requests and API communication.
- **Express.js** - Lightweight server framework for routing and API handling.
- **Hugging Face Text-to-Image Model** - AI-powered logo and texture generation.
- **Framer Motion** - Enables smooth animations and transitions.
- **Valtio** - Manages global state seamlessly in the application.

⚡ **Quick Start**

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm (comes with Node.js)

### Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kazeneza-zephilin/3d-shop.git
   cd 3d-shop
   ```
2. Install Dependencies for both the client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Set Up Environment Variables:
Create a .env file in the project root and add the following line:
```env
FAL_AI_API_KEY=your_hugging_face_api_key
```
### Running the Project
Start the Backend Server:
```bash
    cd server
    npm start
```
Start the Frontend Application:
```bash
cd client
npm run dev
```
🤝 Contributing

Contributions are welcome! Feel free to submit pull requests and open issues.
🌟 If you found this project useful, give it a star ⭐!
