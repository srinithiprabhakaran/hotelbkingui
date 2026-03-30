pipeline{
    agent any
    stages{
        stage("Checkout code"){
            steps{
                git "git branch: 'main', url: 'https://github.com/srinithiprabhakaran/hotelbkingui.git'"
            }
        }
        stage("Build"){
            steps{
                bat 'javac Main.java'
            }

        }
        stage("Test"){
            steps{
                bat 'java Main'
            }
        }
        stage("Deploy"){
            steps{
                echo "Deploying application"
            }
        }
    }
}


