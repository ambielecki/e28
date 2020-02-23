<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'e28');

// Project repository
set('repository', 'git@github.com:ambielecki/e28.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
set('shared_files', []);
set('shared_dirs', []);

// Writable dirs by web server 
set('writable_dirs', []);


// Hosts

host('andrewbielecki.com')
    ->user('ambielecki')
    ->stage('production')
    ->set('deploy_path', '/var/www/html/e28');
    

// Tasks

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
//    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

task('test', function () {
    writeln('Hello deployer');
});

task('pwd', function () {
    $result = run('pwd');
    writeln("Current dir: {$result}");
});

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
