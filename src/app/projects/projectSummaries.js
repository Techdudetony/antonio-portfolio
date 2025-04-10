// app/projects/projectSummaries.js

const projectSummaries = {
    AI_Prompt_Detector: {
      summary: "​The AI_Prompt_Detector is a Python program designed to determine whether a given text prompt is AI-generated or human-written. The project focuses on analyzing text inputs to identify patterns and characteristics that distinguish AI-generated content from that created by humans. The repository includes examples of both human and AI-generated texts, highlighting the differences between them. For instance, human-generated text examples often contain personal reflections and varied sentence structures, while AI-generated texts may exhibit more formal language and repetitive patterns. The project aims to develop a detection mechanism based on these observations.",
      icon: "/prompt_icon.png"
    },
    AuraBloomMMSE: {
      summary: "​AuraBloomMMSE is a Python-based, rule-based program designed to function as a self-assessment tool modeled after the Mini-Mental State Examination (MMSE). Its primary aim is to evaluate cognitive abilities, including orientation, memory, attention, recall, and language skills. The project includes a Python script named AuraBloomMMSE.py, which contains the core logic for the self-assessment quiz. Additionally, there is a document titled Building_a_rule-based_system_w_Python.docx that provides insights into the development process of the rule-based system. The repository also contains standard files like .gitignore, LICENSE, README.md, and requirements.txt, which collectively support the project's structure and offer necessary information for users and developers.",
      icon: "/mmse_icon.png"
    },
    Orca_Article_RAG: {
      summary: "​Orca_Article_RAG is a Python-based application designed to implement a Retrieval-Augmented Generation (RAG) system using a Wikipedia article on orcas. The program allows users to input a URL or upload a text file, which it then processes to extract and clean the content. This extracted text is subsequently segmented into smaller chunks and embedded using OpenAI's embedding model to facilitate efficient retrieval. Once the document is processed, the application enables users to input queries related to the content. The system retrieves the most relevant text segments based on the user's query and utilizes OpenAI's GPT-3.5 model to generate comprehensive responses. This approach combines information retrieval with generative capabilities to provide accurate and contextually relevant answers.",
      icon: "/orca_icon.png"
    },
    PkSavEditor: {
      summary: "PkSavEditor is a Python-based application created to edit and manage save files from Pokémon games. Its primary function is to give users the ability to view and modify in-game data, such as Pokémon stats, trainer information, or inventory items, by directly interacting with the .sav file format. The project is designed to assist players and developers who want greater control over their game progress or who are interested in exploring how save data is structured and manipulated. The repository includes a main script (sav_editor.py) that handles the core editing functionality, as well as example files like modified_game.sav to demonstrate practical use cases. Developed in an IDE, the project also contains solution and project files, making it easier to build and expand. With clear organization and open-source licensing under MIT, PkSavEditor is a useful tool for both casual fans and developers working with Pokémon save data.",
      icon: "/pksave_icon.png"
    },
    PokemonAI: {
      summary: "​PokemonAI is an AI-driven program designed to automate navigation through Pokémon FireRed while adhering to Nuzlocke challenge rules. The project focuses on automating the player's movement within the game's starting room, capturing screenshots of the emulator screen, and maintaining logs of the AI's actions and any encountered errors. The repository includes essential files such as PokemonAI.py, which contains the core logic for automation, and screenshot.png, likely serving as an example output from the screen capturing feature. Additionally, project and solution files (PokemonAI.pyproj and PokemonAI.sln) suggest development within an Integrated Development Environment (IDE). The project is open-source, licensed under the MIT license, inviting collaboration and further development from the community.",
      icon: "/pokemonai_icon.png"
    },
    AI_Detector: {
      summary: "​The AI_Detector is a Python-based program designed to determine whether an image is AI-generated or a real photograph. The project involves analyzing specific traits and characteristics that distinguish AI-generated images from authentic ones. To develop this detection mechanism, the creator collected examples of both real photos and AI-generated images, utilizing real photos from personal albums and AI images generated on FreePik.com. The repository includes a solution file (AI_Detector_Program.sln), suggesting the use of an Integrated Development Environment (IDE) for development. Additionally, it contains a .gitignore file to manage unnecessary files in version control, and a README.md file that provides an overview of the project and outlines the steps taken in its development.",
      icon: "/aidetector_icon.png"
    },
    "AI-Image-Processing-Classification": {
      summary: "​AI-Image-Processing-Classification is a Python-based project that integrates image processing techniques with machine learning classification models. The repository contains scripts that apply various image filters and analyze their effects on image classification outcomes. For instance, the basic_filter.py script demonstrates how different filters, such as blur and emboss, alter an image's appearance and subsequently influence a classifier's predictions. Additionally, the project includes visualization tools like Grad-CAM to highlight regions within images that the model focuses on during classification, providing insights into the model's decision-making process. The repository also offers sample images, including both original and processed versions, to illustrate the impact of various image processing techniques on classification results. By combining image processing with classification and visualization methods, the project aims to enhance the understanding of how preprocessing affects machine learning models' performance and interpretability in image analysis tasks.",
      icon: "/camera_icon.png"
    },
    Project_Aura_Bloom: {
      summary: "​Project_Aura_Bloom is a Kotlin-based application developed by asandoval557, as indicated by the repository's content and structure. The project includes directories such as .idea, app, and gradle, along with files like build.gradle.kts, gradle.properties, and settings.gradle.kts, which are typical components of a Kotlin project. The repository's description, 'PnP2_3' suggests it may be part of a series or a specific version of the project. However, the repository lacks a README file or detailed documentation, making it challenging to ascertain the application's specific purpose or functionality without further information.",
      icon: "/aurabloom_icon.png"
    },
  };
  
  export default projectSummaries;
  