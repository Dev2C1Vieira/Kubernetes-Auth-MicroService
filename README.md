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

```
docker-compose up --build
```
>Change PG_HOST to "host.docker.internal". Change it back to "postgresql-service" when you want to run the API in Minikube.

## 4. Navigate to Kubernetes folder
```
cd k8s
```

## 5. Start Minikube
```
minikube start
```
And enable metrics:
```
minikube addons enable metrics-server
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
Create secrets:
```
kubectl apply -f auth-api-cloud-secrets.yaml
```

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
Open ```http://localhost:8080``` on your browser to check, and then test the routes on Postman.

>You need this command to remain active, so use a second CMD tab/window from now on.

If you get error 500, hit "Ctrl + C" and try the following on a different CMD tab/window:
```
kubectl exec -it postgresql-0 -- psql -U postgres -d Auth-MicroService
```
And then:
```
\dn
```
If you're not seeing the "app" schema, go back to the other CMD tab/window and run:
```
kubectl cp ../bd.sql postgresql-0:/bd.sql
```
And then:
```
kubectl exec -it postgresql-0 -- psql -U postgres -d Auth-MicroService -f /bd.sql
```
And check again if you see the "app" schema. If you do, run the port-forwarding again.


## 11. Test API using K6
Install K6:
```
winget install k6
```
Make sure you are on the project root:
```
cd "{projectPath}"
```
Run the test script:
```
k6 run load-test.js
```

## 12. Load test
```
kubectl run -i --rm load-generator --image=busybox -- /bin/sh -c "while true; do wget -q -O- http://localhost:8080/api/auth/login > /dev/null; done"
```
To stop:
```
kubectl delete {load-generator}
```