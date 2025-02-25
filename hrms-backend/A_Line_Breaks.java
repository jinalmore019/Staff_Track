import java.util.*;
public class A_Line_Breaks{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int t=sc.nextInt();
        while(t--){
            int n=sc.nextInt();
            int m=sc.nextInt();
            String[] str=new String[n];
            for(int i=0;i<n;i++){
                str[i]=sc.next(); 
            }
            int ans=0;
            int cnt=0;
            for(int j=0;j<n;j++){
                int len=str[i].length;
                if(sum + len > m)break;
                else{
                    ans+=len;
                    cnt++;
                }
            }
            System.out.println(cnt);
        }
    }
}