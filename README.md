# Kubernetes-Auth-MicroService
Cloud Computing Systems Project for the Master's in Computer Engineering course.

---

# Setup guide
## 1. Open CMD in project root
```
cd "{projectPath}"
```

## 2. Import database
NOTE: You might need to add "psql" to PATH first.
```
psql -U postgres -f bd.sql
```

## 3. Build and run Docker container (optional)
NOTE: Change PG_HOST to "host.docker.internal". Change it back to "postgresql-service" when you want to run the API in Minikube.
```
docker-compose up --build
```

## 4. Navigate to Kubernetes folder
```
cd k8s
```

## 5. Start Minikube
```
minikube start
```

## 6. Create Kubernetes secrets
```
kubectl create secret generic auth-api-secrets --from-env-file=.env
```

## 7. Check secrets (optional)
```
kubectl get secrets
```
And then:
```
kubectl describe secret auth-api-secrets
```

## 8. Apply YAML files
Create database's PersistentVolumeClaim:
```
kubectl apply -f postgre-pvc.yaml
```

Create PersistentVolume:
```
kubectl apply -f postgre-pv.yaml
```

PostgreSQL deployment:
```
kubectl apply -f dep-postgreSQL.yaml
```

PostgreSQL service:
```
kubectl apply -f serv-postgreSQL.yaml
```

API deployment:
```
kubectl apply -f deployment.yaml
```

API service:
```
kubectl apply -f service.yaml
```

Horizontal Pod Autoscaler:
```
kubectl apply -f hpa.yaml
```

## 9. Check pods, services and HPA (optional)
Check pods:
```
kubectl get pods
```

Check services:
```
kubectl get services
```

Check HPA and dynamic scaling:
```
kubectl get hpa
```

## 10. Port-forwarding
```
kubectl port-forward deployment/scc-deployment 8080:8080
```
Open ```http://localhost:8080``` on your browser to check.

## Test API using K6
Install K6:
```
winget install k6
```
