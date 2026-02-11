last_200_commits=$(git log -200 --pretty=format:"%H")
rm -f last_200.txt
for commit in $last_200_commits; do
    content=$(git show $commit:latest.txt)
    echo $content >> last_200.txt
done