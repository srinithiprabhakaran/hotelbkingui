pipeline{
    agent any
    stages{
        stage("Checkout code"){
            steps{
                git "https://github.com/srinithiprabhakaran/hotelbkingui/git"
            }
        }
        stage("Build"){
            steps{
                sh 'javac Main.java'
            }

        }
        stage("Test"){
            steps{
                sh 'java Main'
            }
        }
        stage("Deploy"){
            steps{
                echo "Deploying application"
            }
        }
    }
}


