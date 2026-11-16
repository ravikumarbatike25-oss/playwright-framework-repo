/**
 * Playwright + Allure CI pipeline for Playwrite_Framwork
 *
 * Prerequisites on the Jenkins agent:
 *   - Node.js 20+ (24 recommended) and npm on PATH, OR NodeJS tool named "node-24" in Global Tool Configuration
 *   - JDK 17+ for Allure CLI (tool named "jdk-21" optional)
 *   - Linux: libs for Chromium (Playwright install --with-deps handles this)
 *   - Windows: same; agents usually run headed locally only — CI uses headless (see playwright.config.ts when CI=true)
 *
 * Jenkins credentials (Secret text) — IDs must match below or edit withCredentials:
 *   playwright-base-url       -> Base_URL
 *   playwright-login-username -> LOGIN_Username
 *   playwright-login-password -> LOGIN_Password
 *   playwright-api-base-url   -> API_BASE_URL
 *   playwright-api-token      -> API_TOKEN
 *
 * dotenv loads config/.env.<ENV> but does NOT override variables already set in the environment,
 * so Jenkins credentials take precedence over git-ignored .env files.
 *
 * Optional plugins: Allure Jenkins Plugin, HTML Publisher, Timestamper
 */

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '15'))
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
    }

    parameters {
        choice(
            name: 'ENV',
            choices: ['qa', 'dev', 'stage'],
            description: 'Loads config/.env.<ENV> (secrets from Jenkins override file values)'
        )
        choice(
            name: 'PROJECT',
            choices: ['chromium', 'all'],
            description: 'Playwright project; "all" runs every project in playwright.config.ts'
        )
        string(
            name: 'TEST_GREP',
            defaultValue: '',
            description: 'Optional Playwright grep filter (e.g. @smoke). Leave empty to run all tests.'
        )
    }

    environment {
        CI = 'true'
        ENV = "${params.ENV}"
        NPM_CONFIG_FUND = 'false'
        NPM_CONFIG_AUDIT = 'false'
    }

    tools {
        // Uncomment and match Global Tool Configuration names if you use the Jenkins Tool Installer plugins
        // jdk 'jdk-21'
        // nodejs 'node-24'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node -v && npm -v'
                        sh 'npm ci'
                    } else {
                        bat 'node -v && npm -v'
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install --with-deps chromium'
                    } else {
                        bat 'npx playwright install --with-deps chromium'
                    }
                }
            }
        }

        stage('Run Playwright tests') {
            steps {
                script {
                    def projectFlag = params.PROJECT == 'all' ? '' : "--project=${params.PROJECT}"
                    def grepFlag = params.TEST_GREP?.trim() ? "--grep=${params.TEST_GREP.trim()}" : ''
                    def testCmd = "npx playwright test ${projectFlag} ${grepFlag}".trim()

                    withCredentials([
                        string(credentialsId: 'playwright-base-url', variable: 'Base_URL'),
                        string(credentialsId: 'playwright-login-username', variable: 'LOGIN_Username'),
                        string(credentialsId: 'playwright-login-password', variable: 'LOGIN_Password'),
                        string(credentialsId: 'playwright-api-base-url', variable: 'API_BASE_URL'),
                        string(credentialsId: 'playwright-api-token', variable: 'API_TOKEN'),
                    ]) {
                        if (isUnix()) {
                            sh testCmd
                        } else {
                            bat testCmd
                        }
                    }
                }
            }
        }

        stage('Generate Allure report') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx allure --version'
                        sh 'npm run allure:generate'
                    } else {
                        bat 'npx allure --version'
                        bat 'npm run allure:generate'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                archiveArtifacts artifacts: 'reports/html-report/**', allowEmptyArchive: true, fingerprint: true
                archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true, fingerprint: true
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true, fingerprint: true
            }
            // Requires "Allure Jenkins Plugin". Skipped gracefully if not installed.
            catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
            // Requires "HTML Publisher Plugin". Skipped gracefully if not installed.
            catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports/html-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    reportTitles: 'Playwright'
                ])
            }
        }
        failure {
            script {
                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true, fingerprint: true
            }
        }
    }
}