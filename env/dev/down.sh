echo
echo Docker stop
echo
docker-compose -f $(pwd)/docker-compose.yml down --remove-orphans --rmi all 

echo
echo Empty removing
echo
sudo rm -rf $( find -empty )
sudo rm -rf $( find -empty )
sudo rm -rf $( find -empty )

echo
echo Data removing
echo
sudo rm -rf ./data/ 
